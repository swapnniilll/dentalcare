import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pencil, Trash2, Plus, X, Star } from 'lucide-react';
import './Reviews.css';

const API_BASE_URL = 'http://localhost:8081';

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    reviewText: '',
    rating: 5,
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/api/reviews`);
      setReviews(res.data);
    } catch (err) {
      console.error('Failed to fetch reviews:', err);
      setError('Failed to load reviews.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', role: '', reviewText: '', rating: 5 });
    setEditingId(null);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (review) => {
    setFormData({
      name: review.name,
      role: review.role,
      reviewText: review.reviewText,
      rating: review.rating || 5,
    });
    setEditingId(review.id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStarClick = (star) => {
    setFormData({ ...formData, rating: star });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      setError(null);

      if (editingId) {
        await axios.put(`${API_BASE_URL}/api/reviews/${editingId}`, formData);
      } else {
        await axios.post(`${API_BASE_URL}/api/reviews`, formData);
      }

      await fetchReviews();
      closeModal();
    } catch (err) {
      console.error('Failed to save review:', err);
      setError('Failed to save review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;

    try {
      await axios.delete(`${API_BASE_URL}/api/reviews/${id}`);
      setReviews(reviews.filter((r) => r.id !== id));
    } catch (err) {
      console.error('Failed to delete review:', err);
      setError('Failed to delete review.');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="reviews-admin">
      <div className="reviews-admin-header">
        <div>
          <h2>Reviews Management</h2>
          <p>View, edit, or remove patient reviews shown on your website.</p>
        </div>
        <button className="reviews-btn reviews-btn-primary" onClick={openAddModal}>
          <Plus size={18} />
          Add Review
        </button>
      </div>

      {error && <div className="reviews-error-banner">{error}</div>}

      {loading ? (
        <div className="reviews-loading">Loading reviews...</div>
      ) : reviews.length === 0 ? (
        <div className="reviews-empty">No reviews yet.</div>
      ) : (
        <div className="reviews-table-wrapper">
          <table className="reviews-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Rating</th>
                <th>Review</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review.id}>
                  <td className="reviews-table-name">{review.name}</td>
                  <td>
                    <span className="reviews-role-badge">{review.role}</span>
                  </td>
                  <td>
                    <div className="reviews-stars">
                      {Array.from({ length: review.rating || 5 }).map((_, i) => (
                        <Star key={i} size={14} fill="#facc15" stroke="#facc15" />
                      ))}
                    </div>
                  </td>
                  <td className="reviews-table-text">{review.reviewText}</td>
                  <td>{formatDate(review.createdAt)}</td>
                  <td>
                    <div className="reviews-table-actions">
                      <button
                        className="reviews-icon-btn reviews-icon-edit"
                        onClick={() => openEditModal(review)}
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        className="reviews-icon-btn reviews-icon-delete"
                        onClick={() => handleDelete(review.id)}
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="reviews-modal-overlay" onClick={closeModal}>
          <div className="reviews-modal" onClick={(e) => e.stopPropagation()}>
            <div className="reviews-modal-header">
              <h3>{editingId ? 'Edit Review' : 'Add Review'}</h3>
              <button className="reviews-modal-close" onClick={closeModal}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="reviews-form">
              <div className="reviews-form-row">
                <div className="reviews-form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Patient name"
                    required
                  />
                </div>

                <div className="reviews-form-group">
                  <label>Role / Treatment</label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    placeholder="e.g. Dental Implant Patient"
                    required
                  />
                </div>
              </div>

              <div className="reviews-form-group">
                <label>Review Text</label>
                <textarea
                  name="reviewText"
                  value={formData.reviewText}
                  onChange={handleInputChange}
                  placeholder="Patient's feedback..."
                  rows={4}
                  required
                />
              </div>

              <div className="reviews-form-group">
                <label>Rating</label>
                <div className="reviews-star-picker">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={26}
                      onClick={() => handleStarClick(star)}
                      fill={star <= formData.rating ? '#facc15' : 'none'}
                      stroke={star <= formData.rating ? '#facc15' : '#cbd5e1'}
                      style={{ cursor: 'pointer' }}
                    />
                  ))}
                </div>
              </div>

              <div className="reviews-form-actions">
                <button
                  type="button"
                  className="reviews-btn reviews-btn-secondary"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="reviews-btn reviews-btn-primary"
                  disabled={submitting}
                >
                  {submitting ? 'Saving...' : editingId ? 'Update Review' : 'Add Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
       {/* Footer */}
       <footer className="admin-footer text-center text-gray-600 mt-10 pt-4 border-t">
        <div>&copy; {new Date().getFullYear()} Developed by CDAC All Rights Reserved.</div>
      </footer>
    </div>
  );
}

export default Reviews;