import React, { useState } from 'react';
import { mockUsers } from '../../data/mockData';
import './ProfilePage.css';

const ProfilePage = ({ user }) => {
  const currentUser = mockUsers.find(u => u.email === user.email) || mockUsers[0];

  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    firstName: currentUser.name?.split(' ')[0] || '',
    lastName: currentUser.name?.split(' ')[1] || '',
    email: currentUser.email || '',
    phone: currentUser.phone || '',
    location: currentUser.location || '',
    employmentType: currentUser.employmentType || 'Full Time',
  });

  const [errors, setErrors] = useState({});

  // Validation rules updated for Jordan & QA
  const validate = (data) => {
    const errors = {};

    if (!data.firstName) {
      errors.firstName = "First Name is required and should contain only letters.";
    } else if (!/^[A-Za-z]+$/.test(data.firstName)) {
      errors.firstName = "First Name should contain only letters.";
    }

    if (!data.lastName) {
      errors.lastName = "Last Name is required and should contain only letters.";
    } else if (!/^[A-Za-z]+$/.test(data.lastName)) {
      errors.lastName = "Last Name should contain only letters.";
    }

    if (!data.email) {
      errors.email = "Email is required.";
    } else if (!/^\S+@\S+\.com$/.test(data.email)) {
      errors.email = "Email must be valid and end with .com";
    }

    if (!data.phone) {
      errors.phone = "Phone number is required.";
    } else if (!/^07[0-9]{8}$/.test(data.phone)) {
      errors.phone = "Phone number must start with 07 and contain 10 digits.";
    }

    if (data.location && data.location.length > 50) {
      errors.location = "Location cannot exceed 50 characters.";
    }

    const allowedTypes = ["Full Time", "Part Time", "Contractor"];
    if (!data.employmentType) {
      errors.employmentType = "Employment Type is required.";
    } else if (!allowedTypes.includes(data.employmentType)) {
      errors.employmentType = "Employment Type must be one of: Full Time, Part Time, Contractor.";
    }

    return errors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log("Saved data:", formData);
    setErrors({});
    setIsEditing(false);
  };

  return (
    <div className="profile-page">
      <div className="page-header">
        <h1 className="page-title">Profile</h1>
        <p className="page-subtitle">Manage your personal and employment information</p>
        <button
          className="btn btn-primary"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Cancel" : "✏️ Edit Profile"}
        </button>
        {isEditing && (
          <button className="btn btn-success" onClick={handleSave}>
            💾 Save
          </button>
        )}
      </div>

      <div className="profile-container">
        <aside className="profile-sidebar">
          <div className="profile-card">
            <div className="profile-avatar-large" aria-label="Profile Avatar">
              {currentUser.avatar || currentUser.name?.charAt(0)}
            </div>
            <div className="profile-info">
              <h2 className="profile-name">{currentUser.name}</h2>
              <p className="profile-title">{currentUser.position}</p>
              <p className="profile-employment">{currentUser.employmentType}</p>
            </div>
          </div>
        </aside>

        <section className="profile-content">
          <div className="profile-tabs" role="tablist">
            {['profile', 'employment', 'notes'].map(tab => (
              <button
                key={tab}
                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
                role="tab"
                aria-selected={activeTab === tab}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="tab-content">
            {activeTab === 'profile' && (
              <ProfileTab
                user={formData}
                errors={errors}
                isEditing={isEditing}
                handleChange={handleChange}
              />
            )}
            {activeTab === 'employment' && (
              <EmploymentTab user={currentUser} />
            )}
            {activeTab === 'notes' && (
              <NotesTab user={currentUser} />
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

const ProfileTab = ({ user, errors, isEditing, handleChange }) => (
  <div className="tab-panel">
    <section className="section">
      <h3 className="section-title">Personal Information</h3>
      <p className="section-subtitle">Your basic contact and personal details</p>

      <div className="form-grid">
        {[
          { label: 'First Name', name: 'firstName', value: user.firstName },
          { label: 'Last Name', name: 'lastName', value: user.lastName },
          { label: 'Email', name: 'email', value: user.email },
          { label: 'Phone', name: 'phone', value: user.phone },
          { label: 'Location', name: 'location', value: user.location },
          { label: 'Employment Type', name: 'employmentType', value: user.employmentType }
        ].map((item, i) => (
          <div className="form-group" key={i}>
            <label className="form-label">{item.label}</label>
            {isEditing ? (
              <input
                type="text"
                name={item.name}
                value={item.value}
                onChange={handleChange}
                className={`form-input ${errors[item.name] ? 'error' : ''}`}
              />
            ) : (
              <div className="form-value">{item.value}</div>
            )}
            {errors[item.name] && <div className="error-text">{errors[item.name]}</div>}
          </div>
        ))}
      </div>
    </section>
  </div>
);

const EmploymentTab = ({ user }) => (
  <div className="tab-panel">
    <section className="section">
      <h3 className="section-title">Employment Details</h3>
      <p className="section-subtitle">Your role and organizational information</p>
      <div className="form-grid">
        {[
          { label: 'Job Title', value: user.position },
          { label: 'Department', value: user.department },
          { label: 'Manager', value: user.manager || 'N/A' },
          { label: 'Contract Start Date', value: user.startDate || '01/15/2023' }
        ].map((item, i) => (
          <div className="form-group" key={i}>
            <label className="form-label">{item.label}</label>
            <div className="form-value">{item.value}</div>
          </div>
        ))}
      </div>
    </section>
  </div>
);

const NotesTab = ({ user }) => (
  <div className="tab-panel">
    <section className="section">
      <h3 className="section-title">Notes</h3>
      <p className="section-subtitle">Additional information and comments</p>
      <div className="notes-section">
        <h4>Professional Notes</h4>
        <div className="notes-content">
          {user.professionalNotes ||
            'Experienced software engineer with expertise in React and Node.js. Strong team player and mentor.'}
        </div>
      </div>
    </section>
  </div>
);

export default ProfilePage;
