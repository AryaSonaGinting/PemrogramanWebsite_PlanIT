// src/utils/timeHelpers.js (new utility file)
export const validateTime = (timeString) => {
  if (!timeString || timeString.trim() === '') {
    return { isValid: true, formatted: '' };
  }
  
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  
  if (!timeRegex.test(timeString)) {
    return { isValid: false, error: 'Format waktu tidak valid. Gunakan HH:MM (00:00 - 23:59)' };
  }
  
  // Ensure consistent format with leading zeros
  const [hours, minutes] = timeString.split(':');
  const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  
  return { isValid: true, formatted: formattedTime };
};

export const formatTimeForDisplay = (timeString) => {
  if (!timeString) return '';
  
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours, 10);
  
  if (hour >= 0 && hour < 12) {
    return `${timeString} AM`;
  } else if (hour === 12) {
    return `${timeString} PM`;
  } else {
    return `${String(hour - 12).padStart(2, '0')}:${minutes} PM`;
  }
};

export const getTimeRemaining = (deadline) => {
  if (!deadline) return null;
  
  const now = new Date();
  const deadlineDate = new Date(deadline);
  const diffMs = deadlineDate.getTime() - now.getTime();
  
  if (diffMs <= 0) {
    return { isOverdue: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
  
  return { isOverdue: false, days, hours, minutes, seconds };
};

export const parseTimeInput = (input) => {
  // Handle various time formats
  if (!input) return '';
  
  let cleaned = input.replace(/[^0-9:]/g, '');
  
  // If only numbers, try to format
  if (!cleaned.includes(':') && cleaned.length <= 4) {
    if (cleaned.length <= 2) {
      return cleaned.padStart(2, '0') + ':00';
    } else {
      return cleaned.slice(0, 2) + ':' + cleaned.slice(2, 4).padStart(2, '0');
    }
  }
  
  return cleaned;
};