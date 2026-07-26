import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pencil, Trash2, Plus, X } from 'lucide-react';
import './MarqueeMessages.css';

const API_BASE_URL = 'http://localhost:8081';

function MarqueeMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    emojiStart: '',
    message: '',
    highlightText: '',
    emojiEnd: '',
    displayOrder: 0,
    active: true,
  });

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/api/marquee/all`);
      setMessages(res.data);
    } catch (err) {
      console.error('Failed to fetch marquee messages:', err);
      setError('Failed to load marquee messages.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      emojiStart: '',
      message: '',
      highlightText: '',
      emojiEnd: '',
      displayOrder: 0,
      active: true,
    });
    setEditingId(null);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (msg) => {
    setFormData({
      emojiStart: msg.emojiStart || '',
      message: msg.message || '',
      highlightText: msg.highlightText || '',
      emojiEnd: msg.emojiEnd || '',
      displayOrder: msg.displayOrder ?? 0,
      active: msg.active ?? true,
    });
    setEditingId(msg.id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      setError(null);

      if (editingId) {
        await axios.put(`${API_BASE_URL}/api/marquee/${editingId}`, formData);
      } else {
        await axios.post(`${API_BASE_URL}/api/marquee`, formData);
      }

      await fetchMessages();
      closeModal();
    } catch (err) {
      console.error('Failed to save marquee message:', err);
      setError('Failed to save marquee message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this marquee message?')) return;

    try {
      await axios.delete(`${API_BASE_URL}/api/marquee/${id}`);
      setMessages(messages.filter((m) => m.id !== id));
    } catch (err) {
      console.error('Failed to delete marquee message:', err);
      setError('Failed to delete marquee message.');
    }
  };

  return (
    <div className="marquee-admin">
      <div className="marquee-admin-header">
        <div>
          <h2>Marquee Ticker Management</h2>
          <p>Manage the scrolling announcement bar shown across your website.</p>
        </div>
        <button className="marquee-btn marquee-btn-primary" onClick={openAddModal}>
          <Plus size={18} />
          Add Message
        </button>
      </div>

      {error && <div className="marquee-error-banner">{error}</div>}

      {loading ? (
        <div className="marquee-loading">Loading marquee messages...</div>
      ) : messages.length === 0 ? (
        <div className="marquee-empty">No marquee messages yet. Click "Add Message" to create one.</div>
      ) : (
        <div className="marquee-table-wrapper">
          <table className="marquee-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Preview</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr key={msg.id}>
                  <td className="marquee-order-cell">#{msg.displayOrder}</td>
                  <td className="marquee-preview-cell">
                    {msg.emojiStart && <span className="marquee-emoji">{msg.emojiStart}</span>}
                    <span>{msg.message}</span>
                    {msg.highlightText && (
                      <span className="marquee-highlight-badge">{msg.highlightText}</span>
                    )}
                    {msg.emojiEnd && <span className="marquee-emoji">{msg.emojiEnd}</span>}
                  </td>
                  <td>
                    <span className={`marquee-status-badge ${msg.active ? 'active' : 'inactive'}`}>
                      {msg.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <div className="marquee-table-actions">
                      <button
                        className="marquee-icon-btn marquee-icon-edit"
                        onClick={() => openEditModal(msg)}
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        className="marquee-icon-btn marquee-icon-delete"
                        onClick={() => handleDelete(msg.id)}
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
        <div className="marquee-modal-overlay" onClick={closeModal}>
          <div className="marquee-modal" onClick={(e) => e.stopPropagation()}>
            <div className="marquee-modal-header">
              <h3>{editingId ? 'Edit Message' : 'Add Message'}</h3>
              <button className="marquee-modal-close" onClick={closeModal}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="marquee-form">
              <div className="marquee-form-row">
                <div className="marquee-form-group">
                  <label>Start Emoji</label>
                  <input
                    type="text"
                    name="emojiStart"
                    value={formData.emojiStart}
                    onChange={handleInputChange}
                    placeholder="😁"
                    maxLength={4}
                  />
                </div>

                <div className="marquee-form-group">
                  <label>End Emoji</label>
                  <input
                    type="text"
                    name="emojiEnd"
                    value={formData.emojiEnd}
                    onChange={handleInputChange}
                    placeholder="🦷"
                    maxLength={4}
                  />
                </div>
              </div>

              <div className="marquee-form-group">
                <label>Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Caring For Every Smile.. For Dental Emergency, Call Us On"
                  rows={3}
                  required
                />
              </div>

              <div className="marquee-form-group">
                <label>Highlight Text (e.g. phone number)</label>
                <input
                  type="text"
                  name="highlightText"
                  value={formData.highlightText}
                  onChange={handleInputChange}
                  placeholder="1234567890"
                />
              </div>

              <div className="marquee-form-row">
                <div className="marquee-form-group">
                  <label>Display Order</label>
                  <input
                    type="number"
                    name="displayOrder"
                    value={formData.displayOrder}
                    onChange={handleInputChange}
                    min="0"
                  />
                </div>

                <div className="marquee-form-group marquee-toggle-group">
                  <label>Status</label>
                  <label className="marquee-toggle">
                    <input
                      type="checkbox"
                      name="active"
                      checked={formData.active}
                      onChange={handleInputChange}
                    />
                    <span>{formData.active ? 'Active' : 'Inactive'}</span>
                  </label>
                </div>
              </div>

              <div className="marquee-form-actions">
                <button
                  type="button"
                  className="marquee-btn marquee-btn-secondary"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="marquee-btn marquee-btn-primary"
                  disabled={submitting}
                >
                  {submitting ? 'Saving...' : editingId ? 'Update Message' : 'Add Message'}
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

export default MarqueeMessages;