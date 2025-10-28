import React, { useState } from 'react';
import './AddEntryModal.css';

const AddEntryModal = ({ meeting, onClose }) => {
  const [formData, setFormData] = useState({
    category: '',
    content: '',
    visibility: 'shared'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally save the entry
    console.log('New entry:', formData);
    onClose();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal add-entry-modal">
        <div className="modal-header">
          <h2>Add New Performance Entry</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <p className="modal-subtitle">
            Record your achievements, challenges, goals, or feedback from meetings
          </p>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Select category</option>
                <option value="achievement">Achievement</option>
                <option value="challenge">Challenge</option>
                <option value="goal">Goal</option>
                <option value="feedback">Feedback</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Content *</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                className="form-input form-textarea"
                placeholder="Describe your achievement, challenge, goal, or feedback..."
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Visibility</label>
              <select
                name="visibility"
                value={formData.visibility}
                onChange={handleChange}
                className="form-select"
              >
                <option value="shared">Shared (Visible to Manager)</option>
                <option value="private">Private (Personal notes)</option>
              </select>
            </div>

            <div className="modal-actions">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Add Entry
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEntryModal;