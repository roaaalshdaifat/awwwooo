import React, { useState } from 'react';
import { mockMeetings } from '../../data/mockData';
import AddEntryModal from './AddEntryModal';
import './MeetingsPage.css';

const MeetingsPage = ({ user }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);

  return (
    <div className="meetings-page">
      <div className="page-header">
        <div className="header-main">
          <h1 className="page-title">Meetings & Performance Notes</h1>
          <p className="page-subtitle">Track your 10-10-10 meetings and performance entries</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowAddModal(true)}
        >
          ➕ Add Entry
        </button>
      </div>

      <div className="meetings-container">
        {mockMeetings.map(meeting => (
          <MeetingCard 
            key={meeting.id} 
            meeting={meeting} 
            onAddEntry={(meeting) => {
              setSelectedMeeting(meeting);
              setShowAddModal(true);
            }}
          />
        ))}
      </div>

      {showAddModal && (
        <AddEntryModal 
          meeting={selectedMeeting}
          onClose={() => {
            setShowAddModal(false);
            setSelectedMeeting(null);
          }}
        />
      )}
    </div>
  );
};

const MeetingCard = ({ meeting, onAddEntry }) => {
  const [activeTab, setActiveTab] = useState('all');
  
  const getFilteredEntries = () => {
    if (activeTab === 'all') return meeting.entries;
    return meeting.entries.filter(entry => entry.type === activeTab.replace('s', ''));
  };

  const getTabCount = (type) => {
    if (type === 'all') return meeting.entries.length;
    return meeting.entries.filter(entry => entry.type === type.replace('s', '')).length;
  };

  return (
    <div className="meeting-card">
      <div className="meeting-header">
        <div className="meeting-info">
          <h3 className="meeting-title">{meeting.title}</h3>
          <p className="meeting-attendees">👤 with {meeting.attendees.join(', ')}</p>
        </div>
        <div className="meeting-status">
          <span className={`status-badge ${meeting.status}`}>
            {meeting.status === 'completed' ? 'Completed' : 'Upcoming'}
          </span>
        </div>
      </div>

      {meeting.status === 'completed' ? (
        <div className="meeting-content">
          <div className="entry-tabs">
            <button 
              className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All ({getTabCount('all')})
            </button>
            <button 
              className={`tab-btn ${activeTab === 'achievements' ? 'active' : ''}`}
              onClick={() => setActiveTab('achievements')}
            >
              Achievements ({getTabCount('achievements')})
            </button>
            <button 
              className={`tab-btn ${activeTab === 'challenges' ? 'active' : ''}`}
              onClick={() => setActiveTab('challenges')}
            >
              Challenges ({getTabCount('challenges')})
            </button>
            <button 
              className={`tab-btn ${activeTab === 'goals' ? 'active' : ''}`}
              onClick={() => setActiveTab('goals')}
            >
              Goals ({getTabCount('goals')})
            </button>
            <button 
              className={`tab-btn ${activeTab === 'feedback' ? 'active' : ''}`}
              onClick={() => setActiveTab('feedback')}
            >
              Feedback ({getTabCount('feedback')})
            </button>
          </div>

          <div className="entries-list">
            {getFilteredEntries().map(entry => (
              <EntryItem key={entry.id} entry={entry} />
            ))}
          </div>
        </div>
      ) : (
        <div className="meeting-upcoming">
          <div className="upcoming-placeholder">
            <div className="placeholder-icon">📅</div>
            <h4>No entries yet for this meeting</h4>
            <p>Add your achievements, challenges, and goals before the meeting</p>
            <button 
              className="btn btn-primary"
              onClick={() => onAddEntry(meeting)}
            >
              Add Entry
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const EntryItem = ({ entry }) => {
  const getEntryIcon = (type) => {
    switch (type) {
      case 'achievement': return '🏆';
      case 'challenge': return '⚠️';
      case 'goal': return '🎯';
      case 'feedback': return '💬';
      default: return '📝';
    }
  };

  const getEntryColor = (type) => {
    switch (type) {
      case 'achievement': return 'success';
      case 'challenge': return 'warning';
      case 'goal': return 'info';
      case 'feedback': return 'purple';
      default: return 'info';
    }
  };

  return (
    <div className={`entry-item ${getEntryColor(entry.type)}`}>
      <div className="entry-header">
        <div className="entry-type">
          <span className="entry-icon">{getEntryIcon(entry.type)}</span>
          <span className="entry-type-text">
            {entry.type.charAt(0).toUpperCase() + entry.type.slice(1)}
          </span>
        </div>
        <div className="entry-visibility">
          {entry.visibility === 'shared' ? (
            <span className="visibility-badge shared">👁️ Shared</span>
          ) : (
            <span className="visibility-badge manager-only">🔒 Manager Only</span>
          )}
        </div>
      </div>
      <div className="entry-content">
        {entry.content}
      </div>
    </div>
  );
};

export default MeetingsPage;