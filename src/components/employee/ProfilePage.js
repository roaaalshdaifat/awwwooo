import React, { useState } from 'react';
import { mockUsers } from '../../data/mockData';
import './ProfilePage.css';

const ProfilePage = ({ user }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const currentUser = mockUsers.find(u => u.email === user.email) || mockUsers[0];

  return (
    <div className="profile-page">
      <div className="page-header">
        <h1 className="page-title">Profile</h1>
        <p className="page-subtitle">Manage your personal and employment information</p>
        <button className="btn btn-primary">
          ✏️ Edit Profile
        </button>
      </div>

      <div className="profile-container">
        <div className="profile-sidebar">
          <div className="profile-card">
            <div className="profile-avatar-large">
              {currentUser.avatar || currentUser.name?.charAt(0)}
            </div>
            <div className="profile-info">
              <h2 className="profile-name">{currentUser.name}</h2>
              <p className="profile-title">{currentUser.position}</p>
              <p className="profile-employment">{currentUser.employmentType}</p>
            </div>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-tabs">
            <button 
              className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              Profile
            </button>
            <button 
              className={`tab-btn ${activeTab === 'employment' ? 'active' : ''}`}
              onClick={() => setActiveTab('employment')}
            >
              Employment
            </button>
            <button 
              className={`tab-btn ${activeTab === 'notes' ? 'active' : ''}`}
              onClick={() => setActiveTab('notes')}
            >
              Notes
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'profile' && <ProfileTab user={currentUser} />}
            {activeTab === 'employment' && <EmploymentTab user={currentUser} />}
            {activeTab === 'notes' && <NotesTab user={currentUser} />}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileTab = ({ user }) => {
  return (
    <div className="tab-panel">
      <div className="section">
        <h3 className="section-title">Profile Picture</h3>
        <div className="profile-picture-section">
          <div className="profile-avatar-large">
            {user.avatar || user.name?.charAt(0)}
          </div>
        </div>
      </div>

      <div className="section">
        <h3 className="section-title">Personal Information</h3>
        <p className="section-subtitle">Your basic contact and personal details</p>
        
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">First Name</label>
            <div className="form-value">{user.name?.split(' ')[0] || 'John'}</div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Last Name</label>
            <div className="form-value">{user.name?.split(' ')[1] || 'Doe'}</div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Email</label>
            <div className="form-value">{user.email}</div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Phone</label>
            <div className="form-value">{user.phone || '+1 (555) 123-4567'}</div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Location</label>
            <div className="form-value">{user.location || 'San Francisco, CA'}</div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Employment Type</label>
            <div className="form-value">{user.employmentType || 'Full Time'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EmploymentTab = ({ user }) => {
  return (
    <div className="tab-panel">
      <div className="section">
        <h3 className="section-title">Employment Details</h3>
        <p className="section-subtitle">Your role and organizational information</p>
        
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Job Title</label>
            <div className="form-value">{user.position}</div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Department</label>
            <div className="form-value">{user.department}</div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Manager</label>
            <div className="form-value">{user.manager || 'N/A'}</div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Contract Start Date</label>
            <div className="form-value">{user.startDate || '01/15/2023'}</div>
          </div>
        </div>
      </div>

      <div className="section">
        <h3 className="section-title">Compensation & Career</h3>
        <p className="section-subtitle">Your salary and career progression details</p>
        
        <div className="compensation-card">
          <div className="compensation-main">
            <div className="salary-display">
              <span className="currency">$</span>
              <span className="amount">{user.salary?.toLocaleString() || '75,000.00'}</span>
            </div>
            <div className="salary-label">Current Annual Salary</div>
          </div>
          
          <div className="compensation-details">
            <div className="detail-item">
              <span className="detail-label">Last Raise</span>
              <span className="detail-value">{user.lastRaise || 'January 15, 2024'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Last Promotion</span>
              <span className="detail-value">{user.lastPromotion || 'June 15, 2023'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Currency</span>
              <span className="detail-value">{user.currency || 'USD'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NotesTab = ({ user }) => {
  return (
    <div className="tab-panel">
      <div className="section">
        <h3 className="section-title">Notes</h3>
        <p className="section-subtitle">Additional information and comments</p>
        
        <div className="notes-section">
          <h4>Professional Notes</h4>
          <div className="notes-content">
            {user.professionalNotes || 'Experienced software engineer with expertise in React and Node.js. Strong team player and mentor.'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;