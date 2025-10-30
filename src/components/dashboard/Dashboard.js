/**
 * Dashboard.js - لوحة المعلومات الرئيسية
 * Main Dashboard Component with Role-based Views
 * 
 * هذا المكون يحتوي على:
 * - لوحات معلومات مخصصة حسب الدور (Role-specific Dashboards)
 * - مؤشرات الأداء الرئيسية (KPI Cards)
 * - الرسوم البيانية التفاعلية (Interactive Charts)
 * - تتبع الأهداف والتقدم (Goals and Progress Tracking)
 * 
 * أنواع اللوحات:
 * 1. EmployeeDashboard - للموظفين العاديين
 * 2. ManagerDashboard - للمديرين
 * 3. AdminDashboard - للإدارة
 * 4. SuperAdminDashboard - للإدارة العليا
 * 
 * الوظائف:
 * 1. عرض إحصائيات الأداء الشخصي
 * 2. تتبع الأهداف والمهام
 * 3. رسوم بيانية لتحليل الاتجاهات
 * 4. إشعارات وتنبيهات مهمة
 */

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockPerformanceData, mockGoals, mockUsers, mockDepartments, mockAlerts } from '../../data/mockData';
import './Dashboard.css';

/**
 * Dashboard Component - المكون الرئيسي للوحة المعلومات
 * @param {Object} user - بيانات المستخدم الحالي
 */
const Dashboard = ({ user }) => {
  // البحث عن بيانات المستخدم الكاملة من قاعدة البيانات التجريبية
  const currentUser = mockUsers.find(u => u.email === user.email) || mockUsers[0];

  /**
   * توجيه المستخدم للوحة المناسبة حسب دوره
   * Route user to appropriate dashboard based on role
   */
  if (user.role === 'super-admin') {
    return <SuperAdminDashboard />; // لوحة الإدارة العليا - إحصائيات شاملة
  }

  if (user.role === 'admin') {
    return <AdminDashboard />; // لوحة الإدارة - إدارة المستخدمين والأقسام
  }

  if (user.role === 'manager') {
    return <ManagerDashboard user={currentUser} />; // لوحة المدير - إدارة الفريق
  }

  return <EmployeeDashboard user={currentUser} />; // لوحة الموظف - الأداء الشخصي
};

/**
 * EmployeeDashboard - لوحة معلومات الموظف
 * Employee Dashboard Component
 * @param {Object} user - بيانات الموظف الحالي
 * 
 * تحتوي على:
 * - نقاط الأداء الحالية (Current QIS Score)
 * - تقدم الأهداف (Goals Progress)
 * - الاجتماعات القادمة (Upcoming Meetings)
 * - مخطط الأداء الفصلي (Quarterly Performance Chart)
 */
const EmployeeDashboard = ({ user }) => {
  return (
    <div className="dashboard">
      {/* 
        رأس الصفحة - Page header
        ترحيب شخصي مع اسم المستخدم
      */}
      <div className="page-header">
        <h1 className="page-title">Welcome back, {user.name.split(' ')[0]}!</h1>
        <p className="page-subtitle">Here's your performance overview and AI-powered insights</p>
      </div>

      {/* 
        شبكة لوحة المعلومات - Dashboard grid
        تحتوي على الإحصائيات والرسوم البيانية
      */}
      <div className="dashboard-grid">
        {/* 
          بطاقات الإحصائيات - Statistics cards
          عرض المؤشرات الرئيسية للأداء
        */}
        <div className="dashboard-stats">
          {/* بطاقة نقاط الأداء الحالية - Current QIS card */}
          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">Current QIS</span> {/* مؤشر جودة الأداء */}
              <span className="stat-trend positive">+3 from last quarter</span> {/* الاتجاه الإيجابي */}
            </div>
            <div className="stat-value">{user.qis}</div> {/* النقاط الحالية */}
          </div>

          {/* بطاقة الأهداف المكتملة - Goals completed card */}
          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">Goals Completed</span>
              <span className="stat-completion">75% completion rate</span> {/* معدل الإنجاز */}
            </div>
            <div className="stat-value">3/4</div> {/* عدد الأهداف المكتملة من المجموع */}
          </div>

          {/* بطاقة الاجتماع القادم - Next meeting card */}
          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">Next Meeting</span>
              <span className="stat-time">2 days remaining</span> {/* الوقت المتبقي */}
            </div>
            <div className="stat-value">12</div> {/* تاريخ الاجتماع */}
          </div>

          {/* بطاقة ثقة الذكاء الاصطناعي - AI confidence card */}
          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">AI Confidence</span>
              <span className="stat-accuracy">High accuracy</span>
            </div>
            <div className="stat-value">92%</div>
          </div>
        </div>

        <div className="dashboard-charts">
          <div className="chart-section">
            <h3>Quarterly Performance Trend</h3>
            <p>Your improvement score over the last 4 quarters</p>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={mockPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="goals-section">
            <h3>Current Goals Progress</h3>
            <p>Track your quarterly objectives</p>
            <div className="goals-list">
              {mockGoals.map(goal => (
                <div key={goal.id} className="goal-item">
                  <div className="goal-header">
                    <span className="goal-title">{goal.title}</span>
                    <span className={`goal-status ${goal.status}`}>
                      {goal.status === 'completed' ? 'Completed' : 'In Progress'}
                    </span>
                  </div>
                  <div className="goal-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                    <span className="progress-text">{goal.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn btn-link view-all-btn">View All Goals</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ManagerDashboard = ({ user }) => {
  return (
    <div className="dashboard">
      <div className="page-header">
        <h1 className="page-title">Team Performance Dashboard</h1>
        <p className="page-subtitle">Manage your team's performance and review AI-powered recommendations</p>
      </div>

      <div className="dashboard-grid manager">
        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">Team Size</span>
              <span className="stat-subtitle">Direct reports</span>
            </div>
            <div className="stat-value">5</div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">Avg Team QIS</span>
              <span className="stat-trend positive">+2 from last quarter</span>
            </div>
            <div className="stat-value">83</div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">Pending Reviews</span>
              <span className="stat-urgent">1 urgent</span>
            </div>
            <div className="stat-value">4</div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">At Risk</span>
              <span className="stat-attention">Require attention</span>
            </div>
            <div className="stat-value">1</div>
          </div>
        </div>

        <div className="team-performance-chart">
          <h3>Team Performance Trend</h3>
          <p>Average QIS across your team over time</p>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={mockPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#10b981" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="team-ranking">
          <h3>Team Performance Ranking</h3>
          <p>Current QIS scores and trends</p>
          <div className="ranking-list">
            <div className="ranking-item">
              <div className="rank-number">1</div>
              <div className="member-info">
                <span className="member-name">Carol Williams</span>
                <span className="member-role">UI/UX Designer</span>
              </div>
              <div className="member-score excellent">91</div>
              <div className="member-trend positive">+5</div>
            </div>
            <div className="ranking-item">
              <div className="rank-number">2</div>
              <div className="member-info">
                <span className="member-name">John Doe</span>
                <span className="member-role">Software Engineer</span>
              </div>
              <div className="member-score high">88</div>
              <div className="member-trend positive">+3</div>
            </div>
            <div className="ranking-item">
              <div className="rank-number">3</div>
              <div className="member-info">
                <span className="member-name">Alice Johnson</span>
                <span className="member-role">Frontend Developer</span>
              </div>
              <div className="member-score good">85</div>
              <div className="member-trend neutral">0</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  return (
    <div className="dashboard">
      <div className="page-header">
        <div className="header-main">
          <h1 className="page-title">Performance Trends</h1>
          <p className="page-subtitle">Company-wide performance over the last 6 months</p>
        </div>
      
      </div>

      <div className="performance-trends-chart">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={[
            { month: 'Jan', Engineering: 82, Marketing: 79, Overall: 78, Sales: 75 },
            { month: 'Feb', Engineering: 83, Marketing: 80, Overall: 79, Sales: 76 },
            { month: 'Mar', Engineering: 84, Marketing: 81, Overall: 81, Sales: 78 },
            { month: 'Apr', Engineering: 85, Marketing: 81, Overall: 82, Sales: 79 },
            { month: 'May', Engineering: 85, Marketing: 82, Overall: 82, Sales: 79 },
            { month: 'Jun', Engineering: 85, Marketing: 81, Overall: 81, Sales: 79 }
          ]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis domain={[70, 90]} />
            <Tooltip />
            <Line type="monotone" dataKey="Engineering" stroke="#10b981" strokeWidth={2} />
            <Line type="monotone" dataKey="Marketing" stroke="#ef4444" strokeWidth={2} />
            <Line type="monotone" dataKey="Overall" stroke="#3b82f6" strokeWidth={2} />
            <Line type="monotone" dataKey="Sales" stroke="#f59e0b" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="alerts-section">
        <h3>🚨 Recent Alerts</h3>
        <div className="alerts-list">
          {mockAlerts.map(alert => (
            <div key={alert.id} className={`alert-item ${alert.priority}`}>
              <div className="alert-content">
                <span className="alert-message">{alert.message}</span>
                <span className="alert-time">{alert.time}</span>
              </div>
              <span className={`alert-priority ${alert.priority}`}>
                {alert.priority}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SuperAdminDashboard = () => {
  return (
    <div className="dashboard">
      <div className="page-header">
        <div className="header-main">
          <h1 className="page-title">Super Admin Dashboard</h1>
          <p className="page-subtitle">Company-wide performance insights and system management</p>
        </div>

      </div>

      <div className="admin-stats">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <span className="stat-label">Total Employees</span>
            <span className="stat-value">247</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <span className="stat-label">Active Users</span>
            <span className="stat-value">231</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-info">
            <span className="stat-label">Avg Performance</span>
            <span className="stat-value">82.5</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🏆</div>
          <div className="stat-info">
            <span className="stat-label">Satisfaction</span>
            <span className="stat-value">87.2%</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-info">
            <span className="stat-label">Retention Rate</span>
            <span className="stat-value">94.8%</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👔</div>
          <div className="stat-info">
            <span className="stat-label">Managers</span>
            <span className="stat-value">18</span>
          </div>
        </div>
      </div>

      <div className="performance-trends-chart">
        <h3>Performance Trends</h3>
        <p>Company-wide performance over the last 6 months</p>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={[
            { month: 'Jan', Engineering: 82, Marketing: 79, Overall: 78, Sales: 75 },
            { month: 'Feb', Engineering: 83, Marketing: 80, Overall: 81, Sales: 76 },
            { month: 'Mar', Engineering: 84, Marketing: 81, Overall: 82, Sales: 78 },
            { month: 'Apr', Engineering: 85, Marketing: 82, Overall: 82, Sales: 79 },
            { month: 'May', Engineering: 85, Marketing: 82, Overall: 82, Sales: 79 },
            { month: 'Jun', Engineering: 85, Marketing: 81, Overall: 81, Sales: 79 }
          ]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis domain={[70, 90]} />
            <Tooltip />
            <Line type="monotone" dataKey="Engineering" stroke="#10b981" strokeWidth={2} />
            <Line type="monotone" dataKey="Marketing" stroke="#ef4444" strokeWidth={2} />
            <Line type="monotone" dataKey="Overall" stroke="#3b82f6" strokeWidth={2} />
            <Line type="monotone" dataKey="Sales" stroke="#f59e0b" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;