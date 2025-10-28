import React, { useState } from 'react';
import { mockUsers } from '../../data/mockData';
import './ManagerProfile.css';

/**
 * ManagerProfile Component
 * صفحة ملف المدير الشخصي مع إدارة التفضيلات وعرض التقارير المباشرة
 * Features:
 * - معلومات المدير الشخصية
 * - تفضيلات الإدارة والقيادة
 * - قائمة التقارير المباشرة مع درجات الأداء
 * - إعدادات الإشعارات
 */
const ManagerProfile = ({ user }) => {
  const [activeTab, setActiveTab] = useState('profile');
  
  // بيانات المدير الحالي
  const managerData = mockUsers.find(u => u.email === user.email) || {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    position: 'Engineering Manager',
    department: 'Engineering',
    directReports: 8,
    phone: '+1 (555) 987-6543',
    location: 'San Francisco, CA'
  };

  // التقارير المباشرة للمدير
  const directReports = mockUsers.filter(u => u.manager === managerData.name);

  return (
    <div className="manager-profile">
      {/* Page Header - عنوان الصفحة */}
      <div className="page-header">
        <div className="header-main">
          <h1 className="page-title">Manager Profile</h1>
          <p className="page-subtitle">Manage your profile and team management preferences</p>
        </div>
        <button className="btn btn-primary">
          ✏️ Edit Profile
        </button>
      </div>

      <div className="manager-content">
        {/* Manager Info Card - كارت معلومات المدير */}
        <div className="manager-sidebar">
          <div className="manager-info-card">
            <div className="manager-avatar-large">
              {managerData.name?.charAt(0) || 'S'}
            </div>
            <div className="manager-details">
              <h2 className="manager-name">{managerData.name}</h2>
              <p className="manager-title">{managerData.position}</p>
              <p className="manager-department">{managerData.department}</p>
              <div className="manager-stats">
                <span className="stat-item">👥 {directReports.length} Direct Reports</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area - المحتوى الرئيسي */}
        <div className="manager-main">
          {/* Personal Information Section - قسم المعلومات الشخصية */}
          <div className="section">
            <h3 className="section-title">Personal Information</h3>
            <p className="section-subtitle">Your contact details and basic information</p>
            
            <div className="info-grid">
              <div className="info-group">
                <div className="info-row">
                  <label>First Name</label>
                  <span>Sarah</span>
                </div>
                <div className="info-row">
                  <label>Last Name</label>
                  <span>Johnson</span>
                </div>
              </div>
              
              <div className="info-group">
                <div className="info-row">
                  <label>Email</label>
                  <span>📧 {managerData.email}</span>
                </div>
                <div className="info-row">
                  <label>Phone</label>
                  <span>📞 {managerData.phone}</span>
                </div>
              </div>
              
              <div className="info-group">
                <div className="info-row">
                  <label>Job Title</label>
                  <span>{managerData.position}</span>
                </div>
                <div className="info-row">
                  <label>Location</label>
                  <span>📍 {managerData.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Management Preferences Section - قسم تفضيلات الإدارة */}
          <div className="section">
            <h3 className="section-title">Management Preferences</h3>
            <p className="section-subtitle">Your leadership style and team management approach</p>
            
            <div className="preferences-content">
              <div className="preference-item">
                <h4>Professional Bio</h4>
                <p>Experienced engineering manager with 8+ years in software development and 3+ years in team leadership. Passionate about mentoring developers and building high-performing teams.</p>
              </div>
              
              <div className="preference-item">
                <h4>Preferred Meeting Style</h4>
                <p>Weekly 1:1s with monthly team reviews</p>
              </div>
              
              <div className="preference-item">
                <h4>Management Philosophy</h4>
                <p>I believe in servant leadership, continuous feedback, and empowering team members to grow their careers.</p>
              </div>
            </div>
          </div>

          {/* Direct Reports Section - قسم التقارير المباشرة */}
          <div className="section">
            <h3 className="section-title">Direct Reports</h3>
            <p className="section-subtitle">Your team members and their current performance</p>
            
            <div className="reports-list">
              {directReports.map(member => (
                <DirectReportCard key={member.id} member={member} />
              ))}
            </div>
          </div>

          {/* Notification Preferences Section - قسم تفضيلات الإشعارات */}
          <div className="section">
            <h3 className="section-title">Notification Preferences</h3>
            <p className="section-subtitle">Configure how you receive updates and alerts</p>
            
            <div className="notification-settings">
              <NotificationToggle 
                title="Weekly Email Digest"
                description="Receive weekly team performance summaries"
                enabled={true}
              />
              <NotificationToggle 
                title="Performance Alerts"
                description="Get notified when team members need attention"
                enabled={true}
              />
              <NotificationToggle 
                title="Meeting Reminders"
                description="Reminders for upcoming 1:1s and reviews"
                enabled={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * DirectReportCard Component
 * كارت عرض معلومات التقرير المباشر
 */
const DirectReportCard = ({ member }) => {
  const getPerformanceColor = (qis) => {
    if (qis >= 85) return 'high-performer';
    if (qis >= 72) return 'good-performer';
    return 'needs-support';
  };

  return (
    <div className="direct-report-card">
      <div className="report-avatar">
        {member.avatar || member.name?.charAt(0)}
      </div>
      <div className="report-info">
        <h4 className="report-name">{member.name}</h4>
        <p className="report-position">{member.position}</p>
      </div>
      <div className="report-performance">
        <span className="qis-label">QIS:</span>
        <span className={`qis-value ${getPerformanceColor(member.qis)}`}>
          {member.qis}
        </span>
        <span className={`performance-badge ${getPerformanceColor(member.qis)}`}>
          {member.qis >= 85 ? 'High Performer' : member.qis >= 72 ? 'Good' : 'Needs Support'}
        </span>
      </div>
    </div>
  );
};

/**
 * NotificationToggle Component
 * مفتاح تبديل الإشعارات
 */
const NotificationToggle = ({ title, description, enabled }) => {
  return (
    <div className="notification-item">
      <div className="notification-info">
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
      <div className="notification-toggle">
        <span className={`toggle-switch ${enabled ? 'enabled' : 'disabled'}`}>
          {enabled ? 'Enabled' : 'Disabled'}
        </span>
      </div>
    </div>
  );
};

export default ManagerProfile;