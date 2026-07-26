import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pencil, Trash2, Plus, X, Upload } from 'lucide-react';
import './Blog.css';

const API_BASE_URL = 'http://localhost:8081';

function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    category: '',
    date: '',
    title: '',
    excerpt: '',
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/api/blog`);
      setPosts(res.data);
    } catch (err) {
      console.error('Failed to fetch blog posts:', err);
      setError('Failed to load blog posts.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ category: '', date: '', title: '', excerpt: '' });
    setImageFile(null);
    setImagePreview(null);
    setEditingId(null);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (post) => {
    setFormData({
      category: post.category,
      date: post.date,
      title: post.title,
      excerpt: post.excerpt,
    });
    setImagePreview(`${API_BASE_URL}${post.imageUrl}`);
    setImageFile(null);
    setEditingId(post.id);
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
    payload.append('category', formData.category);
    payload.append('date', formData.date);
    payload.append('title', formData.title);
    payload.append('excerpt', formData.excerpt);
    if (imageFile) {
      payload.append('image', imageFile);
    }

    try {
      setSubmitting(true);
      setError(null);

      if (editingId) {
        await axios.put(`${API_BASE_URL}/api/blog/${editingId}`, payload, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await axios.post(`${API_BASE_URL}/api/blog`, payload, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      await fetchPosts();
      closeModal();
    } catch (err) {
      console.error('Failed to save blog post:', err);
      setError('Failed to save blog post. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;

    try {
      await axios.delete(`${API_BASE_URL}/api/blog/${id}`);
      setPosts(posts.filter((p) => p.id !== id));
    } catch (err) {
      console.error('Failed to delete blog post:', err);
      setError('Failed to delete blog post.');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="blog-admin">
      <div className="blog-admin-header">
        <div>
          <h2>Blog Management</h2>
          <p>Add, edit, or remove blog posts shown on your website.</p>
        </div>
        <button className="blog-btn blog-btn-primary" onClick={openAddModal}>
          <Plus size={18} />
          Add Blog Post
        </button>
      </div>

      {error && <div className="blog-error-banner">{error}</div>}

      {loading ? (
        <div className="blog-loading">Loading blog posts...</div>
      ) : posts.length === 0 ? (
        <div className="blog-empty">No blog posts yet. Click "Add Blog Post" to create one.</div>
      ) : (
        <div className="blog-table-wrapper">
          <table className="blog-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Date</th>
                <th>Excerpt</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td>
                    <img
                      src={`${API_BASE_URL}${post.imageUrl}`}
                      alt={post.title}
                      className="blog-table-img"
                    />
                  </td>
                  <td className="blog-table-title">{post.title}</td>
                  <td>
                    <span className="blog-category-badge">{post.category}</span>
                  </td>
                  <td>{formatDate(post.date)}</td>
                  <td className="blog-table-excerpt">{post.excerpt}</td>
                  <td>
                    <div className="blog-table-actions">
                      <button
                        className="blog-icon-btn blog-icon-edit"
                        onClick={() => openEditModal(post)}
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        className="blog-icon-btn blog-icon-delete"
                        onClick={() => handleDelete(post.id)}
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
        <div className="blog-modal-overlay" onClick={closeModal}>
          <div className="blog-modal" onClick={(e) => e.stopPropagation()}>
            <div className="blog-modal-header">
              <h3>{editingId ? 'Edit Blog Post' : 'Add Blog Post'}</h3>
              <button className="blog-modal-close" onClick={closeModal}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="blog-form">
              <div className="blog-form-group">
                <label>Image</label>
                <label className="blog-image-upload">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="blog-image-preview" />
                  ) : (
                    <div className="blog-image-placeholder">
                      <Upload size={24} />
                      <span>Click to upload image</span>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    hidden
                  />
                </label>
              </div>

              <div className="blog-form-row">
                <div className="blog-form-group">
                  <label>Category</label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    placeholder="e.g. Smile Care"
                    required
                  />
                </div>

                <div className="blog-form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="blog-form-group">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Blog post title"
                  required
                />
              </div>

              <div className="blog-form-group">
                <label>Excerpt</label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  placeholder="Short description..."
                  rows={4}
                  required
                />
              </div>

              <div className="blog-form-actions">
                <button
                  type="button"
                  className="blog-btn blog-btn-secondary"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="blog-btn blog-btn-primary"
                  disabled={submitting}
                >
                  {submitting ? 'Saving...' : editingId ? 'Update Post' : 'Publish Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
        <footer className="admin-footer text-center text-light py-3">
  <div>&copy; {new Date().getFullYear()} Developed by CDAC All Rights Reserved.</div>
</footer>
    </div>
  );
}

export default Blog;