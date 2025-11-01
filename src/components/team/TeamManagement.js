import React, { useState } from 'react';
import { mockUsers } from '../../data/mockData';
import EmployeeModal from './EmployeeModal';
import ScheduleMeetingModal from './ScheduleMeetingModal';
import './TeamManagement.css';

const TeamManagement = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('All Team Members');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduleEmployee, setScheduleEmployee] = useState(null);

  const teamMembers = user.role === 'manager' 
    ? mockUsers.filter(u => u.manager === user.name)
    : mockUsers.filter(u => u.role === 'employee');

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="team-management">
      <div className="page-header">
        <div className="header-main">
          <h1 className="page-title">Team Management</h1>
          <p className="page-subtitle">Monitor and manage your team's performance and development</p>
        </div>
      </div>

      <div className="team-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search team members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
        
        <div className="filter-container">
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="filter-select"
          >
            <option>All Team Members</option>
            <option>Software Engineer</option>
            <option>Frontend Developer</option>
            <option>Backend Developer</option>
          </select>
          <span className="filter-icon">🔽</span>
        </div>
      </div>

      <div className="team-grid">
        {filteredMembers.map(member => (
          <TeamMemberCard
            key={member.id}
            member={member}
            onViewDetails={() => setSelectedEmployee(member)}
            onScheduleMeeting={() => {
              setScheduleEmployee(member);
              setShowScheduleModal(true);
            }}
          />
        ))}
      </div>

      {selectedEmployee && (
        <EmployeeModal
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
        />
      )}

      {showScheduleModal && (
        <ScheduleMeetingModal
          employee={scheduleEmployee}
          onClose={() => {
            setShowScheduleModal(false);
            setScheduleEmployee(null);
          }}
        />
      )}
    </div>
  );
};

const TeamMemberCard = ({ member, onViewDetails, onScheduleMeeting }) => {
  const getPerformanceIcon = (qis) => {
    if (qis >= 90) return '📈';
    if (qis >= 80) return '📊';
    if (qis >= 70) return '📉';
    return '⚠️';
  };

  const getPerformanceColor = (qis) => {
    if (qis >= 90) return 'excellent';
    if (qis >= 80) return 'good';
    if (qis >= 70) return 'average';
    return 'needs-attention';
  };

  return (
    <div className="team-member-card">
      <div className="member-header">
        <div className="member-avatar">
          {member.avatar || member.name?.charAt(0)}
        </div>
        <div className="member-basic-info">
          <h3 className="member-name">{member.name}</h3>
          <p className="member-position">{member.position}</p>
          <p className="member-department">{member.department || 'Unknown Department'}</p>
        </div>
        <div className={`performance-indicator ${getPerformanceColor(member.qis)}`}>
          <span className="performance-icon">{getPerformanceIcon(member.qis)}</span>
        </div>
      </div>

      <div className="member-stats">
        <div className="stat-item">
          <span className="stat-label">Current Score</span>
          <span className="stat-value">{member.qis}/100</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Last Review</span>
          <span className="stat-value">2024-07-15</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Goals Status</span>
          <span className="stat-value">8/10 completed</span>
        </div>
      </div>

      <div className="member-contact">
        <div className="contact-item">
          <span className="contact-icon">📧</span>
          <span className="contact-text">{member.email}</span>
        </div>
      </div>

      
        <button className="btn btn-primary" onClick={onScheduleMeeting}>
          📅 Schedule Meeting
        </button>
      </div>
   
  );
};

export default TeamManagement;