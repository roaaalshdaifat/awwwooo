import React, { useState } from 'react';
import { mockUsers } from '../../data/mockData';
import './UserManagement.css';

/**
 * UserManagement Component
 * إدارة المستخدمين الكاملة - صفحة الإدارة العليا
 * Features:
 * - عرض إحصائيات المستخدمين
 * - جدول المستخدمين مع البحث والفلترة
 * - إدارة الأدوار والصلاحيات
 * - إضافة مستخدمين جدد
 */
const UserManagement = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All Roles');
  const [statusFilter, setStatusFilter] = useState('All Status');

  // فلترة المستخدمين حسب البحث والفلاتر
  const filteredUsers = mockUsers.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'All Roles' || u.role === roleFilter;
    const matchesStatus = statusFilter === 'All Status' || u.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  // حساب الإحصائيات
  const stats = {
    total: mockUsers.length,
    active: mockUsers.filter(u => u.status === 'active').length,
    managers: mockUsers.filter(u => u.role === 'manager').length,
    superAdmins: mockUsers.filter(u => u.role === 'super-admin').length
  };

  return (
    <div className="user-management">
      {/* Page Header - عنوان الصفحة */}
      <div className="page-header">
        <div className="header-main">
          <h1 className="page-title">User Management</h1>
          <p className="page-subtitle">Manage all users, roles, and permissions</p>
        </div>
        <button className="btn btn-primary">
          👤 Add New User
        </button>
      </div>

      {/* User Statistics - إحصائيات المستخدمين */}
      <div className="user-stats">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <span className="stat-label">Total Users</span>
            <span className="stat-value">{stats.total}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <span className="stat-label">Active Users</span>
            <span className="stat-value">{stats.active}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">👑</div>
          <div className="stat-info">
            <span className="stat-label">Managers</span>
            <span className="stat-value">{stats.managers}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-info">
            <span className="stat-label">Super Admins</span>
            <span className="stat-value">{stats.superAdmins}</span>
          </div>
        </div>
      </div>

      {/* Users Table Section - قسم جدول المستخدمين */}
      <div className="users-section">
        {/* Search and Filters - البحث والفلاتر */}
        <div className="users-controls">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search users by name, email, or department..."
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

        {/* Users List Header - رأس قائمة المستخدمين */}
        <div className="users-header">
          <h3>All Users</h3>
          <p>Showing {filteredUsers.length} of {mockUsers.length} users</p>
        </div>

        {/* Users Table - جدول المستخدمين */}
        <div className="users-table">
          {filteredUsers.map(user => (
            <UserRow key={user.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * UserRow Component
 * صف المستخدم في الجدول
 */
const UserRow = ({ user }) => {
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
    <div className="user-row">
      {/* User Info - معلومات المستخدم */}
      <div className="user-info">
        <div className="user-avatar">
          {user.avatar || user.name?.charAt(0)}
        </div>
        <div className="user-details">
          <h4 className="user-name">{user.name}</h4>
          <p className="user-email">{user.email}</p>
        </div>
      </div>

      {/* Role Badge - شارة الدور */}
      <div className="user-role">
        <span className={`role-badge ${roleBadge.color}`}>
          {roleBadge.icon} {roleBadge.text}
        </span>
      </div>

      {/* Department - القسم */}
      <div className="user-department">
        <span>{user.department || 'Unknown'}</span>
      </div>

      {/* Status Badge - شارة الحالة */}
      <div className="user-status">
        <span className={`status-badge ${statusBadge.color}`}>
          {statusBadge.text}
        </span>
      </div>

      {/* Join Date - تاريخ الانضمام */}
      <div className="user-date">
        <span>{user.startDate || '2024-01-20'}</span>
      </div>

      {/* Actions - الإجراءات */}
      <div className="user-actions">
        <button className="action-btn">⋯</button>
      </div>
    </div>
  );
};

export default UserManagement;