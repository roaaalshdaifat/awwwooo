import React, { useState } from 'react';
import './EmployeeModal.css';

const EmployeeModal = ({ employee, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="modal-overlay">
      <div className="modal employee-modal">
        <div className="modal-header">
          <div className="employee-header-info">
            <div className="employee-avatar-large">
              {employee.avatar || employee.name?.charAt(0)}
            </div>
            <div>
              <h2>{employee.name}</h2>
              <p>{employee.position} • {employee.email}</p>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <div className="employee-tabs">
            <button 
              className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`tab-btn ${activeTab === 'performance' ? 'active' : ''}`}
              onClick={() => setActiveTab('performance')}
            >
              Performance
            </button>
            <button 
              className={`tab-btn ${activeTab === 'recommendations' ? 'active' : ''}`}
              onClick={() => setActiveTab('recommendations')}
            >
              AI Recommendations
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'overview' && <OverviewTab employee={employee} />}
            {activeTab === 'performance' && <PerformanceTab employee={employee} />}
            {activeTab === 'recommendations' && <RecommendationsTab employee={employee} />}
          </div>
        </div>
      </div>
    </div>
  );
};

const OverviewTab = ({ employee }) => {
  return (
    <div className="tab-panel">
      <div className="overview-stats">
        <div className="stat-card">
          <div className="stat-label">Current Status</div>
          <div className="stat-value">
            <span className="badge badge-success">High Performer</span>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-label">Current QIS</div>
          <div className="stat-value">{employee.qis}</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-label">Recent Achievements</div>
          <div className="stat-value">3</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-label">Current Challenges</div>
          <div className="stat-value">1</div>
        </div>
      </div>

      <div className="meeting-schedule">
        <h4>Meeting Schedule</h4>
        <div className="schedule-item">
          <span>Last meeting: 2024-07-15</span>
        </div>
        <div className="schedule-item">
          <span>Next meeting: 2024-08-15</span>
        </div>
      </div>
    </div>
  );
};

const PerformanceTab = ({ employee }) => {
  return (
    <div className="tab-panel">
      <div className="performance-chart-placeholder">
        <h4>Performance Trend (Last 6 Months)</h4>
        <div className="chart-placeholder">
          <p>Performance chart would be displayed here</p>
        </div>
      </div>
    </div>
  );
};

const RecommendationsTab = ({ employee }) => {
  return (
    <div className="tab-panel">
      <div className="recommendations-list">
        <div className="recommendation-item">
          <div className="recommendation-header">
            <span className="recommendation-icon">📈</span>
            <span className="recommendation-type">Raise</span>
            <span className="confidence-badge">92% confidence</span>
          </div>
          <p>7% salary increase recommended</p>
          <div className="recommendation-actions">
            <button className="btn btn-success">Approve</button>
            <button className="btn btn-secondary">Defer</button>
            <button className="btn btn-secondary">Reject</button>
          </div>
        </div>

        <div className="recommendation-item">
          <div className="recommendation-header">
            <span className="recommendation-icon">🏆</span>
            <span className="recommendation-type">Recognition</span>
            <span className="confidence-badge">85% confidence</span>
          </div>
          <p>Nominate for Employee of the Quarter</p>
          <div className="recommendation-actions">
            <button className="btn btn-success">Approve</button>
            <button className="btn btn-secondary">Defer</button>
            <button className="btn btn-secondary">Reject</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeModal;