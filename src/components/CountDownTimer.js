import React, { useState, useEffect } from 'react';
import './CountdownTimer.css';

const CountdownTimer = ({ deadline }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [deadline]);

  function calculateTimeLeft() {
    if (!deadline) return null;
    
    const difference = new Date(deadline).getTime() - new Date().getTime();
    
    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isOverdue: true
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isOverdue: false
    };
  }

  if (!timeLeft) {
    return <div className="countdown-empty">No deadline set</div>;
  }

  return (
    <div className={`countdown-container ${timeLeft.isOverdue ? 'overdue' : 'active'}`}>
      {timeLeft.isOverdue ? (
        <div className="countdown-overdue">
          ⚠️ TASK TERLAMBAT!
        </div>
      ) : (
        <>
          {timeLeft.days > 0 && (
            <div className="countdown-unit">
              <div className="countdown-value">{String(timeLeft.days).padStart(2, '0')}</div>
              <div className="countdown-label">Hari</div>
            </div>
          )}
          <div className="countdown-unit">
            <div className="countdown-value">{String(timeLeft.hours).padStart(2, '0')}</div>
            <div className="countdown-label">Jam</div>
          </div>
          <div className="countdown-unit">
            <div className="countdown-value">{String(timeLeft.minutes).padStart(2, '0')}</div>
            <div className="countdown-label">Menit</div>
          </div>
          <div className="countdown-unit">
            <div className="countdown-value">{String(timeLeft.seconds).padStart(2, '0')}</div>
            <div className="countdown-label">Detik</div>
          </div>
        </>
      )}
    </div>
  );
};

export default CountdownTimer;