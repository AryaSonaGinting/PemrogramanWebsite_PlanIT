import React, { useState, useEffect } from 'react';
import './Clock.css';

const Clock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return {
      time: date.toLocaleTimeString('id-ID', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }),
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds()
    };
  };

  const formatDate = (date) => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return date.toLocaleDateString('id-ID', options);
  };

  const getTimeOfDay = (hour) => {
    if (hour < 12) return 'Pagi';
    if (hour < 15) return 'Siang';
    if (hour < 19) return 'Sore';
    return 'Malam';
  };

  const time = formatTime(currentTime);
  const timeOfDay = getTimeOfDay(time.hour);
  const minuteProgress = (time.minute / 60) * 100;

  return (
    <div className="clock-container">
      <div className="clock-greeting">Selamat {timeOfDay}!</div>
      <div className="clock-time">
        {String(time.hour).padStart(2, '0')}:{String(time.minute).padStart(2, '0')}
        <span className="clock-seconds">{String(time.second).padStart(2, '0')}</span>
      </div>
      <div className="clock-date">{formatDate(currentTime)}</div>
      
      <div className="clock-progress-bar">
        <div 
          className="clock-progress-fill"
          style={{ width: `${minuteProgress}%` }}
        />
      </div>
    </div>
  );
};

export default Clock;