import React from 'react';
import './ProgressChart.css';

const ProgressChart = ({ tasks = [], progress = 0 }) => {
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.filter(task => !task.completed).length;
  const totalTasks = tasks.length;
  
  // Calculate tasks by category
  const tasksByCategory = tasks.reduce((acc, task) => {
    const category = task.category || 'Uncategorized';
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  // Get upcoming deadlines (next 3 tasks)
  const upcomingDeadlines = tasks
    .filter(task => !task.completed && task.deadline)
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 3);

  // Calculate circle values
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Format date and time
  const formatDateTime = (deadline) => {
    const date = new Date(deadline);
    const timeString = date.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
    const dateString = date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
    return { timeString, dateString };
  };

  // Get time until deadline
  const getTimeUntilDeadline = (deadline) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffMs = deadlineDate - now;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 0) return 'Overdue';
    if (diffHours < 24) return `${diffHours} jam lagi`;
    if (diffHours < 48) return 'Besok';
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} hari lagi`;
  };

  return (
    <div className="progress-chart">
      <h3 className="progress-chart-title">Progress Task</h3>
      
      {/* Progress Circle */}
      <div className="progress-circle">
        <svg width="150" height="150" viewBox="0 0 150 150">
          <circle
            cx="75"
            cy="75"
            r={radius}
            className="progress-circle-bg"
          />
          <circle
            cx="75"
            cy="75"
            r={radius}
            className="progress-circle-fill"
            style={{
              strokeDasharray,
              strokeDashoffset
            }}
          />
        </svg>
        <div className="progress-text">
          <div className="progress-percent">{progress}%</div>
          <div className="progress-label">Selesai</div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="progress-stats">
        <div className="stat-item">
          <span className="stat-label">Total Task:</span>
          <span className="stat-value">{totalTasks}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Selesai:</span>
          <span className="stat-value success">{completedTasks}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Belum Selesai:</span>
          <span className="stat-value warning">{pendingTasks}</span>
        </div>
      </div>

      {/* Category Breakdown */}
      {Object.keys(tasksByCategory).length > 0 && (
        <div className="category-section">
          <h4 className="section-title">Task per Kategori</h4>
          <div className="category-list">
            {Object.entries(tasksByCategory).map(([category, count]) => (
              <div key={category} className="category-item">
                <span className="category-name">{category}</span>
                <span className="category-count">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Deadlines */}
      {upcomingDeadlines.length > 0 && (
        <div className="upcoming-section">
          <h4 className="section-title">
            <span className="upcoming-icon">⏰</span> 
            Deadline Mendatang
          </h4>
          <div className="upcoming-list">
            {upcomingDeadlines.map(task => {
              const { timeString, dateString } = formatDateTime(task.deadline);
              const timeUntil = getTimeUntilDeadline(task.deadline);
              const isOverdue = timeUntil === 'Overdue';
              
              return (
                <div 
                  key={task.id} 
                  className={`upcoming-item ${isOverdue ? 'overdue' : ''}`}
                >
                  <div className="upcoming-task-title">{task.title}</div>
                  <div className="upcoming-datetime">
                    <span className="date-info">📅 {dateString}</span>
                    <span className="time-info">⏰ {timeString}</span>
                  </div>
                  <div className={`upcoming-time-until ${isOverdue ? 'overdue-badge' : ''}`}>
                    {timeUntil}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Motivation Message */}
      {tasks.length > 0 && (
        <div className="motivation-message">
          {progress === 100 ? (
            <span className="success-message">🎉 Semua task selesai! Excellent work!</span>
          ) : progress >= 75 ? (
            <span className="good-message">💪 Kamu hampir sampai! Terus semangat!</span>
          ) : progress >= 50 ? (
            <span className="okay-message">👍 Setengah jalan sudah! Lanjutkan!</span>
          ) : progress > 0 ? (
            <span className="progress-message">🚀 Bagus! Pertahankan momentum!</span>
          ) : (
            <span className="start-message">🎯 Ayo mulai kerjakan task pertamamu!</span>
          )}
        </div>
      )}
    </div>
  );
};

export default ProgressChart;