import React, { useEffect, useState } from 'react';
import './Notification.css';

const Notification = ({ message, type = 'info', onClose, duration = 5000 }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (onClose && duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [onClose, duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      if (onClose) onClose();
    }, 300); // Match animation duration
  };

  const getNotificationTypeClass = () => {
    switch (type) {
      case 'success':
        return 'notification-success';
      case 'warning':
        return 'notification-warning';
      case 'error':
        return 'notification-error';
      default:
        return 'notification-info';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✓';
      case 'warning':
        return '⚠';
      case 'error':
        return '✗';
      default:
        return 'ℹ';
    }
  };

  return (
    <div className={`notification ${getNotificationTypeClass()} ${isExiting ? 'notification-exit' : ''}`}>
      <div className="notification-content">
        <span className="notification-icon">{getIcon()}</span>
        <span className="notification-message">{message}</span>
      </div>
      <button 
        className="notification-close-button" 
        onClick={handleClose}
        aria-label="Close notification"
      >
        ×
      </button>
      {duration > 0 && (
        <div className="notification-progress-bar">
          <div 
            className="notification-progress-fill"
            style={{ animationDuration: `${duration}ms` }}
          />
        </div>
      )}
    </div>
  );
};

export default Notification;