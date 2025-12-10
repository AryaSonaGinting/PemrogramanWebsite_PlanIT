import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

const TaskList = ({ tasks, onEdit, onDelete, onToggleComplete }) => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('deadline');
  const [filteredCount, setFilteredCount] = useState({ all: 0, pending: 0, completed: 0, overdue: 0 });

  // Calculate task counts for each filter
  useEffect(() => {
    const counts = {
      all: tasks.length,
      pending: tasks.filter(task => !task.completed).length,
      completed: tasks.filter(task => task.completed).length,
      overdue: tasks.filter(task => {
        if (task.completed || !task.deadline) return false;
        return new Date(task.deadline) < new Date();
      }).length
    };
    setFilteredCount(counts);
  }, [tasks]);

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    if (filter === 'overdue') {
      if (task.completed || !task.deadline) return false;
      return new Date(task.deadline) < new Date();
    }
    return true;
  });

  // Sort tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortBy) {
      case 'deadline':
        if (!a.deadline && !b.deadline) return 0;
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return new Date(a.deadline) - new Date(b.deadline);
      case 'priority':
        const priorityOrder = { High: 3, Medium: 2, Low: 1 };
        return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
      case 'category':
        return a.category.localeCompare(b.category);
      case 'created':
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const getFilterLabel = (filterType) => {
    const labels = {
      all: 'Semua',
      pending: 'Belum Selesai',
      completed: 'Selesai',
      overdue: 'Terlambat'
    };
    return labels[filterType] || filterType;
  };

  const getSortLabel = (sortType) => {
    const labels = {
      deadline: 'Deadline',
      priority: 'Prioritas',
      category: 'Kategori',
      created: 'Terbaru',
      title: 'Judul'
    };
    return labels[sortType] || sortType;
  };

  // Handle filter change
  const handleFilterChange = (filterType) => {
    setFilter(filterType);
  };

  if (tasks.length === 0) {
    return (
      <div className="task-list">
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <h3 className="empty-title">Tidak ada task</h3>
          <p className="empty-description">Tambahkan task pertama Anda!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="task-list">
      {/* Filter Controls */}
      <div className="task-controls">
        {/* Filter Buttons */}
        <div className="filter-section">
          <div className="filter-header">
            <span className="filter-label">Filter:</span>
            <span className="filter-count">
              {filteredTasks.length} dari {tasks.length} task
            </span>
          </div>
          
          <div className="filter-buttons">
            {['all', 'pending', 'completed', 'overdue'].map(filterType => (
              <button
                key={filterType}
                className={`filter-button ${filter === filterType ? 'active' : ''}`}
                onClick={() => handleFilterChange(filterType)}
                aria-label={`Filter ${getFilterLabel(filterType)}`}
              >
                <span className="filter-button-text">{getFilterLabel(filterType)}</span>
                <span className="filter-count-badge">{filteredCount[filterType]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sort Controls */}
        <div className="sort-section">
          <label className="sort-label" htmlFor="sort-select">
            Urutkan:
          </label>
          <div className="sort-select-wrapper">
            <select 
              id="sort-select"
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
              aria-label="Urutkan task"
            >
              <option value="deadline">Deadline</option>
              <option value="priority">Prioritas (Tinggi ke Rendah)</option>
              <option value="created">Terbaru</option>
              <option value="title">Judul (A-Z)</option>
              <option value="category">Kategori</option>
            </select>
            <span className="sort-arrow">▼</span>
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="task-items-container">
        {sortedTasks.length === 0 ? (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h3 className="no-results-title">Tidak ada task yang sesuai</h3>
            <p className="no-results-description">
              {filter === 'all' 
                ? 'Tidak ada task yang tersedia'
                : `Tidak ada task dengan filter "${getFilterLabel(filter)}"`
              }
            </p>
            {filter !== 'all' && (
              <button
                className="clear-filter-button"
                onClick={() => setFilter('all')}
              >
                Tampilkan Semua Task
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="task-list-header">
              <span className="current-filter">
                {getFilterLabel(filter)} ({sortedTasks.length} task)
              </span>
              <span className="sort-indicator">
                Diurutkan berdasarkan: {getSortLabel(sortBy)}
              </span>
            </div>

            <div className="task-items">
              {sortedTasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onToggleComplete={onToggleComplete}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};


export default TaskList;
