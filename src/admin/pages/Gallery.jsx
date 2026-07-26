import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pencil, Trash2, Plus, X, Upload } from 'lucide-react';
import './Gallery.css';

const API_BASE_URL = 'http://localhost:8081';

function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    displayOrder: 0,
  });

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/api/gallery`);
      setImages(res.data);
    } catch (err) {
      console.error('Failed to fetch gallery images:', err);
      setError('Failed to load gallery images.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ title: '', subtitle: '', displayOrder: 0 });
    setImageFile(null);
    setImagePreview(null);
    setEditingId(null);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setFormData({
      title: item.title,
      subtitle: item.subtitle,
      displayOrder: item.displayOrder ?? 0,
    });
    setImagePreview(`${API_BASE_URL}${item.imageUrl}`);
    setImageFile(null);
    setEditingId(item.id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!editingId && !imageFile) {
      setError('Please select an image.');
      return;
    }

    const payload = new FormData();
    payload.append('title', formData.title);
    payload.append('subtitle', formData.subtitle);
    payload.append('displayOrder', formData.displayOrder);
    if (imageFile) {
      payload.append('image', imageFile);
    }

    try {
      setSubmitting(true);
      setError(null);

      if (editingId) {
        await axios.put(`${API_BASE_URL}/api/gallery/${editingId}`, payload, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await axios.post(`${API_BASE_URL}/api/gallery`, payload, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      await fetchImages();
      closeModal();
    } catch (err) {
      console.error('Failed to save gallery image:', err);
      setError('Failed to save gallery image. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;

    try {
      await axios.delete(`${API_BASE_URL}/api/gallery/${id}`);
      setImages(images.filter((img) => img.id !== id));
    } catch (err) {
      console.error('Failed to delete gallery image:', err);
      setError('Failed to delete gallery image.');
    }
  };

  return (
    <div className="gallery-admin">
      <div className="gallery-admin-header">
        <div>
          <h2>Gallery Management</h2>
          <p>Add, edit, or remove images shown in your website's gallery.</p>
        </div>
        <button className="gallery-btn gallery-btn-primary" onClick={openAddModal}>
          <Plus size={18} />
          Add Image
        </button>
      </div>

      {error && <div className="gallery-error-banner">{error}</div>}

      {loading ? (
        <div className="gallery-loading">Loading gallery images...</div>
      ) : images.length === 0 ? (
        <div className="gallery-empty">No images yet. Click "Add Image" to create one.</div>
      ) : (
        <div className="gallery-grid-admin">
          {images.map((item) => (
            <div className="gallery-card" key={item.id}>
              <div className="gallery-card-img-wrap">
                <img
                  src={`${API_BASE_URL}${item.imageUrl}`}
                  alt={item.title}
                  className="gallery-card-img"
                />
                <span className="gallery-order-badge">#{item.displayOrder}</span>
              </div>
              <div className="gallery-card-body">
                <h4>{item.title}</h4>
                <p>{item.subtitle}</p>
              </div>
              <div className="gallery-card-actions">
                <button
                  className="gallery-icon-btn gallery-icon-edit"
                  onClick={() => openEditModal(item)}
                  title="Edit"
                >
                  <Pencil size={16} />
                </button>
                <button
                  className="gallery-icon-btn gallery-icon-delete"
                  onClick={() => handleDelete(item.id)}
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="gallery-modal-overlay" onClick={closeModal}>
          <div className="gallery-modal" onClick={(e) => e.stopPropagation()}>
            <div className="gallery-modal-header">
              <h3>{editingId ? 'Edit Image' : 'Add Image'}</h3>
              <button className="gallery-modal-close" onClick={closeModal}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="gallery-form">
              <div className="gallery-form-group">
                <label>Image</label>
                <label className="gallery-image-upload">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="gallery-image-preview" />
                  ) : (
                    <div className="gallery-image-placeholder">
                      <Upload size={24} />
                      <span>Click to upload image</span>
                    </div>
                  )}
                  <input type="file" accept="image/*" onChange={handleImageChange} hidden />
                </label>
              </div>

              <div className="gallery-form-group">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g. Smile Transformation"
                  required
                />
              </div>

              <div className="gallery-form-group">
                <label>Subtitle</label>
                <input
                  type="text"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleInputChange}
                  placeholder="e.g. Modern Dental Treatment"
                  required
                />
              </div>

              <div className="gallery-form-group">
                <label>Display Order</label>
                <input
                  type="number"
                  name="displayOrder"
                  value={formData.displayOrder}
                  onChange={handleInputChange}
                  placeholder="0"
                  min="0"
                />
              </div>

              <div className="gallery-form-actions">
                <button
                  type="button"
                  className="gallery-btn gallery-btn-secondary"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="gallery-btn gallery-btn-primary"
                  disabled={submitting}
                >
                  {submitting ? 'Saving...' : editingId ? 'Update Image' : 'Add Image'}
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

export default Gallery;