import React, { useState } from 'react';
import { mockUsers } from '../../data/mockData';
import AddEmployeePage from './AddEmployeePage';
import './UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState(mockUsers);
  const [activeTab, setActiveTab] = useState('users-list');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [meetingUser, setMeetingUser] = useState(null);

  const handleDelete = (id) => {
    setUsers(users.filter(u => u.id !== id));
  };

  const handleSaveEdit = () => {
    setUsers(users.map(u => (u.id === editingUser.id ? editingUser : u)));
    setEditingUser(null);
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-management">
      <div className="page-header">
        <h1>User Management</h1>
        <p>Manage all users, roles, and permissions</p>
      </div>

      <div className="tabs-container">
        <button 
          className={`tab-button ${activeTab === 'users-list' ? 'active' : ''}`}
          onClick={() => setActiveTab('users-list')}
        >
          📋 Users List
        </button>
        <button 
          className={`tab-button ${activeTab === 'add-employee' ? 'active' : ''}`}
          onClick={() => setActiveTab('add-employee')}
        >
          ➕ Add user
        </button>
      </div>

      {activeTab === 'users-list' ? (
        <div className="users-list-tab">
          <div className="users-controls">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="users-list">
            {filteredUsers.map((user, index) => (
              <UserCard
                key={user.id}
                user={user}
                index={index}
                onEdit={() => setEditingUser(user)}
                onDelete={() => handleDelete(user.id)}
                onMeeting={() => setMeetingUser(user)}
              />
            ))}
          </div>
        </div>
      ) : (
        <AddEmployeePage />
      )}

      {editingUser && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit User</h3>
            <input
              type="text"
              value={editingUser.name}
              onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
            />
            <input
              type="email"
              value={editingUser.email}
              onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
            />
            <select
              value={editingUser.role}
              onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}
            >
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
              <option value="super-admin">Super Admin</option>
            </select>

            <div className="modal-actions">
              <button onClick={handleSaveEdit} className="save-btn">Save</button>
              <button onClick={() => setEditingUser(null)} className="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {meetingUser && (
        <ScheduleMeetingModal
          employee={meetingUser}
          onClose={() => setMeetingUser(null)}
        />
      )}
    </div>
  );
};

const UserCard = ({ user, index, onEdit, onDelete, onMeeting }) => {
  const roleColors = {
    employee: '#10b981',
    manager: '#3b82f6',
    admin: '#8b5cf6',
    'super-admin': '#f59e0b'
  };

  return (
    <div
      className="user-card"
      style={{
        borderLeft: `5px solid ${roleColors[user.role]}`,
        animationDelay: `${index * 0.05}s`
      }}
    >
      <div className="user-info">
        <div className="user-avatar">{user.name.charAt(0)}</div>
        <div className="user-details">
          <h4>{user.name}</h4>
          <p>{user.email}</p>
          <span className="role-badge" style={{backgroundColor: roleColors[user.role]}}>
            {user.role.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="user-actions">
        <button onClick={onEdit} className="action-btn edit-btn">✏️</button>
        <button onClick={onDelete} className="action-btn delete-btn">🗑️</button>
        <button 
          className="action-btn menu-btn"
          onClick={onMeeting}
        >
          Schedule Meeting
        </button>
      </div>
    </div>
  );
};

const ScheduleMeetingModal = ({ employee, onClose }) => {
  const [meetingType, setMeetingType] = useState('Standup');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('30 mins');

  const handleSave = () => {
    console.log("Meeting Scheduled:", { employee, meetingType, date, time, duration });
    alert(`Meeting with ${employee.name} scheduled!`);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Schedule Meeting with {employee.name}</h3>
        <select value={meetingType} onChange={(e) => setMeetingType(e.target.value)}>
          <option>Standup</option>
          <option>1:1</option>
          <option>Team Meeting</option>
          <option>Project Review</option>
        </select>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        <select value={duration} onChange={(e) => setDuration(e.target.value)}>
          <option>15 mins</option>
          <option>30 mins</option>
          <option>45 mins</option>
          <option>60 mins</option>
        </select>
        <div className="modal-actions">
          <button onClick={handleSave} className="save-btn">Save</button>
          <button onClick={onClose} className="cancel-btn">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;