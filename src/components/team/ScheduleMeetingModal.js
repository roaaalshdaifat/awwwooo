import React, { useState } from 'react';
import './ScheduleMeetingModal.css';

const ScheduleMeetingModal = ({ employee, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    date: '',
    time: '',
    duration: '1 hour',
    location: '',
    agenda: '',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Scheduling meeting:', formData);
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
      <div className="modal schedule-meeting-modal">
        <div className="modal-header">
          <h2>📅 Schedule Meeting with {employee?.name}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <p className="modal-subtitle">
            Schedule a new meeting or performance review session
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Meeting Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter meeting title"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Meeting Type *</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Select meeting type</option>
                <option value="10-10-10">10-10-10 Review</option>
                <option value="performance">Performance Review</option>
                <option value="1-on-1">1-on-1 Meeting</option>
                <option value="goal-setting">Goal Setting</option>
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Date *</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Time *</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Duration (minutes)</label>
                <select
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="30 minutes">30 minutes</option>
                  <option value="1 hour">1 hour</option>
                  <option value="1.5 hours">1.5 hours</option>
                  <option value="2 hours">2 hours</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Location/Link</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Conference room or video link"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Agenda</label>
              <textarea
                name="agenda"
                value={formData.agenda}
                onChange={handleChange}
                className="form-input form-textarea"
                placeholder="Meeting agenda and key topics to discuss"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Additional Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="form-input form-textarea"
                placeholder="Any additional notes or preparation instructions"
              />
            </div>

            <div className="modal-actions">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Schedule Meeting
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ScheduleMeetingModal;