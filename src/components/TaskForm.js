import React, { useState, useEffect, useRef } from 'react';
import './TaskForm.css';

const TaskForm = ({ task, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Personal',
    deadlineDate: '',
    deadlineTime: '',
    priority: 'Medium'
  });

  const [timeInputType, setTimeInputType] = useState('dropdown');
  const [formErrors, setFormErrors] = useState({});
  const formRef = useRef(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showScrollBottom, setShowScrollBottom] = useState(false);

  const checkScrollPosition = () => {
    if (formRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = formRef.current;
      setShowScrollTop(scrollTop > 100);
      setShowScrollBottom(scrollTop < scrollHeight - clientHeight - 100);
    }
  };

  const scrollToTop = () => {
    if (formRef.current) {
      formRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const scrollToBottom = () => {
    if (formRef.current) {
      formRef.current.scrollTo({
        top: formRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const formElement = formRef.current;
    if (formElement) {
      formElement.addEventListener('scroll', checkScrollPosition);
      setTimeout(checkScrollPosition, 100);
    }

    return () => {
      if (formElement) {
        formElement.removeEventListener('scroll', checkScrollPosition);
      }
    };
  }, []);

  useEffect(() => {
    setTimeout(checkScrollPosition, 100);
  }, [formData]);

  useEffect(() => {
    if (task) {
      let deadlineDate = '';
      let deadlineTime = '';
      
      if (task.deadline) {
        const date = new Date(task.deadline);
        deadlineDate = date.toISOString().split('T')[0];
        deadlineTime = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
      }

      setFormData({
        title: task.title,
        description: task.description || '',
        category: task.category || 'Personal',
        deadlineDate,
        deadlineTime,
        priority: task.priority || 'Medium'
      });
    }
  }, [task]);

  const categories = ['Personal', 'Work', 'Study', 'Health', 'Finance', 'Other'];
  const priorities = [
    { value: 'Low', label: 'Rendah', color: '#4CAF50' },
    { value: 'Medium', label: 'Sedang', color: '#FF9800' },
    { value: 'High', label: 'Tinggi', color: '#F44336' }
  ];

  const validateForm = () => {
    const errors = {};

    if (!formData.title.trim()) {
      errors.title = 'Judul task harus diisi!';
    }

    if (formData.deadlineTime && formData.deadlineTime.trim() !== '') {
      const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
      if (!timeRegex.test(formData.deadlineTime)) {
        errors.deadlineTime = 'Format waktu tidak valid. Gunakan format HH:MM (00:00 - 23:59)';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleTimeInputChange = (e) => {
    let value = e.target.value;
    value = value.replace(/[^0-9:]/g, '');
    
    if (value.length === 2 && !value.includes(':')) {
      value = value + ':';
    }
    
    if (value.length > 5) {
      value = value.substring(0, 5);
    }
    
    setFormData(prev => ({
      ...prev,
      deadlineTime: value
    }));

    if (formErrors.deadlineTime) {
      setFormErrors(prev => ({
        ...prev,
        deadlineTime: ''
      }));
    }
  };

  const handlePrioritySelect = (priorityValue) => {
    setFormData(prev => ({
      ...prev,
      priority: priorityValue
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    let formattedTime = formData.deadlineTime;
    if (formattedTime && formattedTime.trim() !== '') {
      const [hours, minutes] = formattedTime.split(':');
      formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    }

    let deadline = '';
    if (formData.deadlineDate) {
      if (formattedTime) {
        deadline = `${formData.deadlineDate}T${formattedTime}:00`;
      } else {
        deadline = `${formData.deadlineDate}T23:59:59`;
      }
    }

    const taskData = {
      ...formData,
      deadline,
      deadlineTime: formattedTime
    };

    if (task) {
      onSave(task.id, taskData);
    } else {
      onSave(taskData);
    }
  };

  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
        times.push(timeString);
      }
    }
    return times;
  };

  const timeOptions = generateTimeOptions();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="task-form-container" ref={formRef}>
      {showScrollTop && (
        <button 
          className="scroll-button scroll-top"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </button>
      )}

      {showScrollBottom && (
        <button 
          className="scroll-button scroll-bottom"
          onClick={scrollToBottom}
          aria-label="Scroll to bottom"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      )}

      <form className="task-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">
            Judul Task <span className="required">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Masukkan judul task..."
            required
            className={`form-input ${formErrors.title ? 'error' : ''}`}
          />
          {formErrors.title && (
            <div className="form-error">{formErrors.title}</div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Deskripsi</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Masukkan deskripsi task (opsional)..."
            className="form-textarea"
            rows="4"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Kategori</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="form-select"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Deadline</label>
          
          <div className="deadline-container">
            <div className="date-input-container">
              <label className="form-label">Tanggal</label>
              <input
                type="date"
                name="deadlineDate"
                value={formData.deadlineDate}
                onChange={handleChange}
                className="form-input"
                min={minDate}
              />
            </div>
            
            <div className="time-input-container">
              <label className="form-label">Waktu</label>
              
              <div className="time-input-toggle">
                <button
                  type="button"
                  className={`time-toggle-button ${timeInputType === 'dropdown' ? 'active' : ''}`}
                  onClick={() => setTimeInputType('dropdown')}
                >
                  Pilih
                </button>
                <button
                  type="button"
                  className={`time-toggle-button ${timeInputType === 'manual' ? 'active' : ''}`}
                  onClick={() => setTimeInputType('manual')}
                >
                  Ketik
                </button>
              </div>

              {timeInputType === 'dropdown' ? (
                <select
                  name="deadlineTime"
                  value={formData.deadlineTime}
                  onChange={handleChange}
                  className={`form-select ${formErrors.deadlineTime ? 'error' : ''}`}
                >
                  <option value="">Pilih Waktu</option>
                  {timeOptions.map(time => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="manual-time-input">
                  <input
                    type="text"
                    name="deadlineTimeManual"
                    value={formData.deadlineTime}
                    onChange={handleTimeInputChange}
                    placeholder="HH:MM"
                    className={`form-input ${formErrors.deadlineTime ? 'error' : ''}`}
                    maxLength="5"
                  />
                  <span className="time-format-hint">Contoh: 14:30</span>
                </div>
              )}
              
              {formErrors.deadlineTime && (
                <div className="form-error">{formErrors.deadlineTime}</div>
              )}
            </div>
          </div>
          
          <div className="form-hint">
            ⓘ Kosongkan waktu untuk mengatur deadline sampai akhir hari (23:59)
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Prioritas</label>
          <div className="priority-options">
            {priorities.map(priority => (
              <div
                key={priority.value}
                className={`priority-option ${formData.priority === priority.value ? 'selected' : ''}`}
                style={{
                  '--priority-color': priority.color,
                  '--priority-light-color': `${priority.color}20`
                }}
                onClick={() => handlePrioritySelect(priority.value)}
              >
                <div className="priority-indicator"></div>
                <span className="priority-label">{priority.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="form-buttons">
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={onCancel}
          >
            Batal
          </button>
          <button 
            type="submit"
            className="btn btn-primary"
          >
            <span className="btn-icon">✓</span>
            {task ? 'Update Task' : 'Simpan Task'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
