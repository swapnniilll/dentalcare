import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pencil, Trash2, Plus, X } from 'lucide-react';
import './ChatbotFaqs.css';

const API_BASE_URL = 'http://localhost:8081';

function ChatbotFaqs() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    keywords: '',
    answer: '',
  });

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/api/chatbot-faqs`);
      setFaqs(res.data);
    } catch (err) {
      console.error('Failed to fetch FAQs:', err);
      setError('Failed to load FAQs.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ keywords: '', answer: '' });
    setEditingId(null);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (faq) => {
    setFormData({ keywords: faq.keywords, answer: faq.answer });
    setEditingId(faq.id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      setError(null);

      if (editingId) {
        await axios.put(`${API_BASE_URL}/api/chatbot-faqs/${editingId}`, formData);
      } else {
        await axios.post(`${API_BASE_URL}/api/chatbot-faqs`, formData);
      }

      await fetchFaqs();
      closeModal();
    } catch (err) {
      console.error('Failed to save FAQ:', err);
      setError('Failed to save FAQ. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this FAQ?')) return;

    try {
      await axios.delete(`${API_BASE_URL}/api/chatbot-faqs/${id}`);
      setFaqs(faqs.filter((f) => f.id !== id));
    } catch (err) {
      console.error('Failed to delete FAQ:', err);
      setError('Failed to delete FAQ.');
    }
  };

  return (
    <div className="faqs-admin">
      <div className="faqs-admin-header">
        <div>
          <h2>Chatbot FAQ Management</h2>
          <p>Manage the questions and answers your website chatbot can respond with.</p>
        </div>
        <button className="faqs-btn faqs-btn-primary" onClick={openAddModal}>
          <Plus size={18} />
          Add FAQ
        </button>
      </div>

      {error && <div className="faqs-error-banner">{error}</div>}

      {loading ? (
        <div className="faqs-loading">Loading FAQs...</div>
      ) : faqs.length === 0 ? (
        <div className="faqs-empty">No FAQs yet. Click "Add FAQ" to create one.</div>
      ) : (
        <div className="faqs-table-wrapper">
          <table className="faqs-table">
            <thead>
              <tr>
                <th>Keywords</th>
                <th>Answer</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {faqs.map((faq) => (
                <tr key={faq.id}>
                  <td className="faqs-table-keywords">
                    {faq.keywords.split(',').map((kw, i) => (
                      <span key={i} className="faqs-keyword-badge">{kw.trim()}</span>
                    ))}
                  </td>
                  <td className="faqs-table-answer">{faq.answer}</td>
                  <td>
                    <div className="faqs-table-actions">
                      <button
                        className="faqs-icon-btn faqs-icon-edit"
                        onClick={() => openEditModal(faq)}
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        className="faqs-icon-btn faqs-icon-delete"
                        onClick={() => handleDelete(faq.id)}
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
        <div className="faqs-modal-overlay" onClick={closeModal}>
          <div className="faqs-modal" onClick={(e) => e.stopPropagation()}>
            <div className="faqs-modal-header">
              <h3>{editingId ? 'Edit FAQ' : 'Add FAQ'}</h3>
              <button className="faqs-modal-close" onClick={closeModal}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="faqs-form">
              <div className="faqs-form-group">
                <label>Keywords (comma-separated)</label>
                <input
                  type="text"
                  name="keywords"
                  value={formData.keywords}
                  onChange={handleInputChange}
                  placeholder="e.g. toothache, tooth pain, hurts"
                  required
                />
                <small>These trigger this answer when a visitor's message contains any of them.</small>
              </div>

              <div className="faqs-form-group">
                <label>Answer</label>
                <textarea
                  name="answer"
                  value={formData.answer}
                  onChange={handleInputChange}
                  placeholder="The chatbot's response..."
                  rows={5}
                  required
                />
              </div>

              <div className="faqs-form-actions">
                <button
                  type="button"
                  className="faqs-btn faqs-btn-secondary"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="faqs-btn faqs-btn-primary"
                  disabled={submitting}
                >
                  {submitting ? 'Saving...' : editingId ? 'Update FAQ' : 'Add FAQ'}
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

export default ChatbotFaqs;