import React, { useState } from 'react';
import { mockUsers } from '../../data/mockData';
import './UserManagement.css';

/**
 * UserManagement Component
 * إدارة المستخدمين - صفحة الإدارة العليا
 * Features:
 * - جدول المستخدمين مع البحث والفلترة
 * - أنيميشن عند ظهور الصفوف
 */
const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All Roles');
  const [statusFilter, setStatusFilter] = useState('All Status');

  // فلترة المستخدمين
  const filteredUsers = mockUsers.filter(u => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'All Roles' || u.role === roleFilter;
    const matchesStatus = statusFilter === 'All Status' || u.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="user-management">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">User Management</h1>
        <p className="page-subtitle">Manage all users, roles, and permissions</p>
      </div>

      {/* Search and Filters */}
      <div className="users-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="filters-container">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="filter-select"
          >
            <option>All Roles</option>
            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
            <option value="super-admin">Super Admin</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option>All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="users-table">
        {filteredUsers.map((user, index) => (
          <UserRow key={user.id} user={user} index={index} />
        ))}
      </div>
    </div>
  );
};

/**
 * UserRow Component
 * صف المستخدم مع أنيميشن عند الظهور
 */
const UserRow = ({ user, index }) => {
  const getRoleBadge = (role) => {
    const badges = {
      'employee': { color: 'green', icon: '👤', text: 'Employee' },
      'manager': { color: 'blue', icon: '👑', text: 'Manager' },
      'admin': { color: 'purple', icon: '⚙️', text: 'Admin' },
      'super-admin': { color: 'orange', icon: '⭐', text: 'SuperAdmin' }
    };
    return badges[role] || badges['employee'];
  };

  const getStatusBadge = (status) => {
    return status === 'active'
      ? { color: 'green', text: 'Active' }
      : { color: 'red', text: 'Inactive' };
  };

  const roleBadge = getRoleBadge(user.role);
  const statusBadge = getStatusBadge(user.status);

  return (
    <div className="user-row" style={{ animationDelay: `${index * 0.05}s` }}>
      <div className="user-info">
        <div className="user-avatar">{user.avatar || user.name.charAt(0)}</div>
        <div className="user-details">
          <h4 className="user-name">{user.name}</h4>
          <p className="user-email">{user.email}</p>
        </div>
      </div>

      <div className="user-role">
        <span className={`role-badge ${roleBadge.color}`}>
          {roleBadge.icon} {roleBadge.text}
        </span>
      </div>

      <div className="user-department">{user.department || 'Unknown'}</div>

      <div className="user-status">
        <span className={`status-badge ${statusBadge.color}`}>{statusBadge.text}</span>
      </div>

      <div className="user-date">{user.startDate || '2024-01-20'}</div>

      <div className="user-actions">
        <button className="action-btn">⋯</button>
      </div>
    </div>
  );
};

export default UserManagement;
