import React, { useState } from 'react';
import './SettingsPage.css';

/**
 * SettingsPage Component
 * صفحة الإعدادات الكاملة مع التبويبات المختلفة
 * Features:
 * - تبويب Personal للمعلومات الشخصية
 * - تبويب Security للأمان والصلاحيات
 * - تبويب Notifications للإشعارات
 * - تبويب Activity لسجل النشاطات
 */
const SettingsPage = ({ user }) => {
  const [activeTab, setActiveTab] = useState('personal');

  // بيانات المستخدم الحالي (للمثال)
  const currentUser = {
    name: 'Mike Wilson',
    email: 'admin@company.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    role: 'System Administrator',
    joinDate: '2021-01-05',
    lastLogin: '2024-01-21 09:15 AM',
    bio: 'Experienced system administrator with 10+ years in enterprise software management and security.'
  };

  return (
    <div className="settings-page">
      {/* Page Header - عنوان الصفحة */}
      <div className="page-header">
        <div className="header-main">
          <h1 className="page-title">Profile Settings</h1>
          <p className="page-subtitle">Manage your account settings and preferences</p>
        </div>
        <button className="btn btn-primary">
          ✏️ Edit Profile
        </button>
      </div>

      {/* Settings Container - حاوية الإعدادات */}
      <div className="settings-container">
        
        {/* User Profile Card - كارت الملف الشخصي */}
        <div className="profile-card">
          <div className="profile-avatar-large">
            MW
          </div>
          <div className="profile-info">
            <h2 className="profile-name">{currentUser.name} 👑</h2>
            <p className="profile-role">System Administrator</p>
            <div className="profile-badge">
              <span className="super-admin-badge">🟣 Super Administrator</span>
            </div>
          </div>
          
          <div className="profile-contact">
            <div className="contact-item">
              <span className="contact-icon">📧</span>
              <span>{currentUser.email}</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📞</span>
              <span>{currentUser.phone}</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <span>{currentUser.location}</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📅</span>
              <span>Joined {currentUser.joinDate}</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">🕒</span>
              <span>Last login: {currentUser.lastLogin}</span>
            </div>
          </div>
        </div>

        {/* Settings Tabs Content - محتوى تبويبات الإعدادات */}
        <div className="settings-content">
          
          {/* Tabs Navigation - تنقل التبويبات */}
          <div className="settings-tabs">
            <button 
              className={`tab-btn ${activeTab === 'personal' ? 'active' : ''}`}
              onClick={() => setActiveTab('personal')}
            >
              Personal
            </button>
            <button 
              className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              Security
            </button>
            <button 
              className={`tab-btn ${activeTab === 'notifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('notifications')}
            >
              Notifications
            </button>
            <button 
              className={`tab-btn ${activeTab === 'activity' ? 'active' : ''}`}
              onClick={() => setActiveTab('activity')}
            >
              Activity
            </button>
          </div>

          {/* Tab Content - محتوى التبويبات */}
          <div className="tab-content">
            {activeTab === 'personal' && <PersonalTab user={currentUser} />}
            {activeTab === 'security' && <SecurityTab />}
            {activeTab === 'notifications' && <NotificationsTab />}
            {activeTab === 'activity' && <ActivityTab />}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * PersonalTab Component - تبويب المعلومات الشخصية
 */
const PersonalTab = ({ user }) => {
  return (
    <div className="tab-panel">
      <div className="section">
        <h3 className="section-title">Personal Information</h3>
        <p className="section-subtitle">Update your personal details and bio</p>
        
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">First Name</label>
            <input type="text" className="form-input" defaultValue="Mike" />
          </div>
          
          <div className="form-group">
            <label className="form-label">Last Name</label>
            <input type="text" className="form-input" defaultValue="Wilson" />
          </div>
          
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input type="email" className="form-input" defaultValue={user.email} />
          </div>
          
          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input type="tel" className="form-input" defaultValue={user.phone} />
          </div>
          
          <div className="form-group">
            <label className="form-label">Location</label>
            <input type="text" className="form-input" defaultValue={user.location} />
          </div>
        </div>
        
        <div className="form-group">
          <label className="form-label">Bio</label>
          <textarea 
            className="form-textarea" 
            rows={4}
            defaultValue={user.bio}
          />
        </div>
      </div>
    </div>
  );
};

/**
 * SecurityTab Component - تبويب الأمان
 */
const SecurityTab = () => {
  const permissions = [
    { name: 'User Management', description: 'Create, edit, and delete user accounts', granted: true },
    { name: 'System Settings', description: 'Modify system configuration and preferences', granted: true },
    { name: 'Security Administration', description: 'Manage security policies and access controls', granted: true },
    { name: 'Data Management', description: 'Access and manage all system data', granted: true },
    { name: 'Audit Logs', description: 'View and manage system audit logs', granted: true }
  ];

  return (
    <div className="tab-panel">
      <div className="section">
        <h3 className="section-title">System Permissions</h3>
        <p className="section-subtitle">Your current system access and permissions</p>
        
        <div className="permissions-list">
          {permissions.map((permission, index) => (
            <div key={index} className="permission-item">
              <div className="permission-info">
                <h4>{permission.name}</h4>
                <p>{permission.description}</p>
              </div>
              <div className="permission-status">
                <span className={`status-badge ${permission.granted ? 'granted' : 'denied'}`}>
                  {permission.granted ? '✅ Granted' : '❌ Denied'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * NotificationsTab Component - تبويب الإشعارات
 */
const NotificationsTab = () => {
  const [notifications, setNotifications] = useState({
    emailDigest: true,
    performanceAlerts: true,
    meetingReminders: true,
    systemAlerts: true,
    securityAlerts: true
  });

  const toggleNotification = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="tab-panel">
      <div className="section">
        <h3 className="section-title">Notification Preferences</h3>
        <p className="section-subtitle">Configure how you receive updates and alerts</p>
        
        <div className="notifications-list">
          <NotificationToggle
            title="Weekly Email Digest"
            description="Receive weekly team performance summaries"
            enabled={notifications.emailDigest}
            onToggle={() => toggleNotification('emailDigest')}
          />
          
          <NotificationToggle
            title="Performance Alerts"
            description="Get notified when team members need attention"
            enabled={notifications.performanceAlerts}
            onToggle={() => toggleNotification('performanceAlerts')}
          />
          
          <NotificationToggle
            title="Meeting Reminders"
            description="Reminders for upcoming 1:1s and reviews"
            enabled={notifications.meetingReminders}
            onToggle={() => toggleNotification('meetingReminders')}
          />
          
          <NotificationToggle
            title="System Alerts"
            description="Important system notifications and updates"
            enabled={notifications.systemAlerts}
            onToggle={() => toggleNotification('systemAlerts')}
          />
          
          <NotificationToggle
            title="Security Alerts"
            description="Security-related notifications and warnings"
            enabled={notifications.securityAlerts}
            onToggle={() => toggleNotification('securityAlerts')}
          />
        </div>
      </div>
    </div>
  );
};

/**
 * ActivityTab Component - تبويب النشاطات
 */
const ActivityTab = () => {
  const activities = [
    { action: 'Updated user permissions', time: '2 hours ago', type: 'security' },
    { action: 'Exported user data report', time: '1 day ago', type: 'data' },
    { action: 'Modified system settings', time: '2 days ago', type: 'system' },
    { action: 'Created new user account', time: '3 days ago', type: 'user' },
    { action: 'Reviewed audit logs', time: '1 week ago', type: 'security' }
  ];

  return (
    <div className="tab-panel">
      <div className="section">
        <h3 className="section-title">Recent Activity</h3>
        <p className="section-subtitle">Your recent system activities and changes</p>
        
        <div className="activity-list">
          {activities.map((activity, index) => (
            <div key={index} className="activity-item">
              <div className="activity-icon">
                {activity.type === 'security' && '🔒'}
                {activity.type === 'data' && '📊'}
                {activity.type === 'system' && '⚙️'}
                {activity.type === 'user' && '👤'}
              </div>
              <div className="activity-info">
                <p className="activity-action">{activity.action}</p>
                <p className="activity-time">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * NotificationToggle Component - مفتاح تبديل الإشعارات
 */
const NotificationToggle = ({ title, description, enabled, onToggle }) => {
  return (
    <div className="notification-item">
      <div className="notification-info">
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
      <div className="notification-toggle">
        <button 
          className={`toggle-switch ${enabled ? 'enabled' : 'disabled'}`}
          onClick={onToggle}
        >
          {enabled ? 'Enabled' : 'Disabled'}
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;