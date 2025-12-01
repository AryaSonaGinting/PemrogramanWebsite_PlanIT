import React, { useState } from 'react';
import './EnhancedTimePicker.css';

const EnhancedTimePicker = ({ value, onChange, label }) => {
  const [time, setTime] = useState(value || '');
  const [showDropdown, setShowDropdown] = useState(false);
  const [inputMode, setInputMode] = useState('manual'); // 'manual' or 'dropdown'
  const [hoveredOption, setHoveredOption] = useState(null);

  // Generate time options (every 30 minutes)
  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const hourStr = String(hour).padStart(2, '0');
        const minuteStr = String(minute).padStart(2, '0');
        const timeString = `${hourStr}:${minuteStr}`;
        times.push(timeString);
      }
    }
    return times;
  };

  const timeOptions = generateTimeOptions();
  const quickTimes = ['09:00', '12:00', '14:00', '17:00', '20:00'];

  const handleManualChange = (e) => {
    let value = e.target.value;
    
    // Auto-insert colon
    if (value.length === 2 && !value.includes(':')) {
      value += ':';
    }
    
    // Validate input (only numbers and colon)
    if (/^[0-9:]*$/.test(value) && value.length <= 5) {
      setTime(value);
      if (value.length === 5 && /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/.test(value)) {
        onChange(value);
      }
    }
  };

  const handleTimeSelect = (selectedTime) => {
    setTime(selectedTime);
    onChange(selectedTime);
    setShowDropdown(false);
  };

  const handleBlur = () => {
    // Validate time on blur
    if (time && time.length === 5) {
      const timeRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
      if (timeRegex.test(time)) {
        onChange(time);
      } else {
        setTime('');
        // Optional: show error message in a better way
        console.warn('Waktu tidak valid. Format harus HH:MM (00:00 - 23:59)');
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleBlur();
    }
    if (e.key === 'Escape') {
      setShowDropdown(false);
    }
  };

  return (
    <div className="time-picker">
      <label className="time-picker-label">{label}</label>
      
      <div className="time-picker-mode-toggle">
        <button
          type="button"
          className={`time-picker-mode-button ${inputMode === 'manual' ? 'active' : ''}`}
          onClick={() => setInputMode('manual')}
        >
          Ketik Manual
        </button>
        <button
          type="button"
          className={`time-picker-mode-button ${inputMode === 'dropdown' ? 'active' : ''}`}
          onClick={() => setInputMode('dropdown')}
        >
          Pilih dari Daftar
        </button>
      </div>

      {inputMode === 'manual' ? (
        <div className="time-picker-input-container">
          <input
            type="text"
            value={time}
            onChange={handleManualChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            placeholder="HH:MM"
            className="time-picker-input"
            maxLength="5"
          />
          <button
            type="button"
            className="time-picker-dropdown-button"
            onClick={() => setShowDropdown(!showDropdown)}
            aria-label="Toggle time dropdown"
          >
            ⌄
          </button>
        </div>
      ) : (
        <select
          value={time}
          onChange={(e) => handleTimeSelect(e.target.value)}
          className="time-picker-select"
        >
          <option value="">Pilih waktu...</option>
          {timeOptions.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      )}

      {showDropdown && inputMode === 'manual' && (
        <div className="time-picker-dropdown">
          {timeOptions.map((timeOption) => (
            <div
              key={timeOption}
              className={`time-picker-option ${timeOption === time ? 'selected' : ''} ${timeOption === hoveredOption ? 'hovered' : ''}`}
              onClick={() => handleTimeSelect(timeOption)}
              onMouseEnter={() => setHoveredOption(timeOption)}
              onMouseLeave={() => setHoveredOption(null)}
            >
              {timeOption}
            </div>
          ))}
        </div>
      )}

      <div className="time-picker-quick-buttons">
        {quickTimes.map(quickTime => (
          <button
            key={quickTime}
            type="button"
            className="time-picker-quick-button"
            onClick={() => handleTimeSelect(quickTime)}
          >
            {quickTime}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EnhancedTimePicker;