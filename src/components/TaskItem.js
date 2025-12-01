import React from 'react';
import './TaskItem.css';

const TaskItem = ({ task, onEdit, onDelete, onToggleComplete }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return '#F44336';
      case 'Medium': return '#FF9800';
      case 'Low': return '#4CAF50';
      default: return '#6c757d';
    }
  };

  const getTimeRemaining = (deadline) => {
    if (!deadline) return null;
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const timeDiff = deadlineDate.getTime() - now.getTime();
    
    if (timeDiff < 0) {
      return 'Terlambat';
    }
    
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days} hari ${hours} jam`;
    if (hours > 0) return `${hours} jam ${minutes} menit`;
    return `${minutes} menit`;
  };

  const formatDateTime = (deadline) => {
    if (!deadline) return null;
    const date = new Date(deadline);
    return {
      date: date.toLocaleDateString('id-ID', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }),
      time: date.toLocaleTimeString('id-ID', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      })
    };
  };

  const timeRemaining = getTimeRemaining(task.deadline);
  const isOverdue = timeRemaining === 'Terlambat' && !task.completed;
  const isUrgent = timeRemaining && timeRemaining.includes('menit') && !isOverdue;
  const dateTime = formatDateTime(task.deadline);

  const handleAction = (action, e) => {
    e.stopPropagation();
    action();
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}>
      <div className="task-header">
        <div className="task-title-section">
          <h3 className={`task-title ${task.completed ? 'completed' : ''}`}>
            {task.title}
            {task.completed && <span className="completed-badge">Selesai</span>}
          </h3>
          
          <div className="task-meta">
            <span className="task-category">{task.category}</span>
            <span 
              className="task-priority"
              style={{ backgroundColor: getPriorityColor(task.priority) }}
            >
              {task.priority}
            </span>
          </div>
        </div>

        <div className="task-actions">
          <button
            className="task-action-btn"
            onClick={(e) => handleAction(() => onToggleComplete(task.id), e)}
            title={task.completed ? 'Tandai belum selesai' : 'Tandai selesai'}
            aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
          >
            <span className="action-icon">
              {task.completed ? '↶' : '✓'}
            </span>
          </button>
          <button
            className="task-action-btn"
            onClick={(e) => handleAction(() => onEdit(task), e)}
            title="Edit task"
            aria-label="Edit task"
          >
            <span className="action-icon">✏️</span>
          </button>
          <button
            className="task-action-btn delete"
            onClick={(e) => handleAction(() => onDelete(task.id), e)}
            title="Hapus task"
            aria-label="Delete task"
          >
            <span className="action-icon">🗑️</span>
          </button>
        </div>
      </div>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-footer">
        <div className="deadline-info">
          {task.deadline ? (
            <>
              <div className={`deadline-date ${isOverdue ? 'overdue' : ''} ${task.completed ? 'completed' : ''}`}>
                <span className="deadline-icon">
                  {isOverdue ? '⏰' : '📅'}
                </span>
                {isOverdue ? 'TERLAMBAT - ' : ''}
                {dateTime.date}
              </div>
              
              <div className="deadline-details">
                <div className="deadline-time">
                  <span className="time-icon">⏰</span>
                  {dateTime.time}
                </div>
                
                {!task.completed && timeRemaining && (
                  <div className={`time-remaining ${isOverdue ? 'overdue' : ''} ${isUrgent ? 'urgent' : ''}`}>
                    <span className="countdown-icon">⏳</span>
                    {isOverdue ? 'Sudah lewat deadline!' : `${timeRemaining} lagi`}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="deadline-date no-deadline">
              <span className="deadline-icon">📅</span>
              Tidak ada deadline
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskItem;