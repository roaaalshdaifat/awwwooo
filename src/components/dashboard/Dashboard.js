import React, { useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [goals, setGoals] = useState([
    { id: 1, title: 'Finish Project A', progress: 40, completed: false },
    { id: 2, title: 'Update Website', progress: 60, completed: false },
    { id: 3, title: 'Prepare Report', progress: 20, completed: false },
  ]);

  const handleCompleteGoal = (id) => {
    setGoals(goals.map(g => g.id === id ? {...g, progress: 100, completed: true} : g));
  };

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Dashboard</h1>

    

        {/* Card 2: Current Goals */}
        <div className="card card-goals">
          <h3>🎯 Current Goals</h3>
          {goals.map(goal => (
            <div key={goal.id} className="goal-item">
              <div className="goal-header">
                <span>{goal.title}</span>
                <span>{goal.completed ? '✅ Completed' : `${goal.progress}%`}</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{width: `${goal.progress}%`}}></div>
              </div>
              {!goal.completed && (
                <button className="btn-complete" onClick={() => handleCompleteGoal(goal.id)}>
                  Complete Goal
                </button>
              )}
            </div>
          ))}
        </div>

   
      </div>
   
  );
};

export default Dashboard;
