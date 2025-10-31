/**
 * Dashboard.js - لوحة المعلومات الرئيسية
 * Main Dashboard Component with Role-based Views
 * 
 * يحتوي على:
 * - لوحات معلومات حسب الدور
 * - مؤشرات الأداء (KPI)
 * - مخططات تفاعلية
 * - تتبع الأهداف مع تفاعل Progress Bars
 */

import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockGoals, mockUsers, mockAlerts } from '../../data/mockData';
import './Dashboard.css';

const Dashboard = ({ user }) => {
  const currentUser = mockUsers.find(u => u.email === user.email) || mockUsers[0];

  if (user.role === 'super-admin') return <SuperAdminDashboard />;
  // if (user.role === 'admin') return <AdminDashboard />;

  return <EmployeeDashboard user={currentUser} />;
};

/* ------------------ Employee Dashboard ------------------ */
const EmployeeDashboard = ({ user }) => {
  return (
    <div className="dashboard">
      <div className="page-header">
        <h1 className="page-title">Welcome back, {user.name.split(' ')[0]}!</h1>
        <p className="page-subtitle">Track your quarterly objectives below</p>
      </div>

      <div className="goals-section">
        <h3>Current Goals Progress</h3>
        <div className="goals-list">
          {mockGoals.map((goal, index) => (
            <GoalItem key={goal.id} goal={goal} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

/* ------------------ Goal Item Component ------------------ */
const GoalItem = ({ goal, index }) => {
  const [progress, setProgress] = useState(goal.progress);

  const handleClick = () => {
    setProgress(100);
  };

  return (
    <div
      className="goal-item"
      style={{ animationDelay: `${0.1 * index}s` }}
    >
      <div className="goal-header">
        <span className="goal-title">{goal.title}</span>
        <span className={`goal-status ${progress === 100 ? 'completed' : 'in-progress'}`}>
          {progress === 100 ? 'Completed' : 'In Progress'}
        </span>
      </div>
      <div className="goal-progress" onClick={handleClick}>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <span className="progress-text">{progress}%</span>
      </div>
      <small>Click the blue bar to complete</small>
    </div>
  );
};

/* ------------------ Admin Dashboard ------------------ */


/* ------------------ Super Admin Dashboard ------------------ */
const SuperAdminDashboard = () => {
  return (
    <div className="dashboard">
      <div className="page-header">
        <h1 className="page-title">Super Admin Dashboard</h1>
        <p className="page-subtitle">Company-wide performance insights and system management</p>
      </div>

      <div className="admin-stats">
        <div className="stat-card">👥 Total Employees: 247</div>
        <div className="stat-card">✅ Active Users: 231</div>
        <div className="stat-card">📈 Avg Performance: 82.5</div>
        <div className="stat-card">🏆 Satisfaction: 87.2%</div>
        <div className="stat-card">🎯 Retention Rate: 94.8%</div>
        <div className="stat-card">👔 Managers: 18</div>
      </div>

      <div className="performance-trends-chart">
        <h3>Performance Trends</h3>
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
