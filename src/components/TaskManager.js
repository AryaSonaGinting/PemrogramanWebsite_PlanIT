import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import ProgressChart from './ProgressChart';
import Notification from './Notification';
import Clock from './Clock';
import './TaskManager.css';

const TaskManager = ({ onLogout }) => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('planit-tasks');
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (error) {
        console.error('Error loading tasks from localStorage:', error);
        setTasks([]);
      }
    }
    setLoading(false);
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (!loading) {
      try {
        localStorage.setItem('planit-tasks', JSON.stringify(tasks));
      } catch (error) {
        console.error('Error saving tasks to localStorage:', error);
      }
      checkTaskNotifications();
    }
  }, [tasks, loading]);

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
  };

  const checkTaskNotifications = () => {
    const now = new Date();
    tasks.forEach(task => {
      if (!task.completed && task.deadline) {
        const deadline = new Date(task.deadline);
        const timeDiff = deadline.getTime() - now.getTime();
        const minutesDiff = timeDiff / (1000 * 60);
        
        // Notify for deadlines within 1 hour and not already notified
        if (minutesDiff <= 60 && minutesDiff > 0 && !task.notified) {
          showNotification(
            `Task "${task.title}" deadline dalam ${Math.ceil(minutesDiff)} menit!`, 
            'warning'
          );
          setTasks(prev => prev.map(t => 
            t.id === task.id ? {...t, notified: true} : t
          ));
        }
        
        // Reset notification flag if deadline is in the future
        if (minutesDiff > 60 && task.notified) {
          setTasks(prev => prev.map(t => 
            t.id === task.id ? {...t, notified: false} : t
          ));
        }
      }
    });
  };

  const addTask = (taskData) => {
    const newTask = {
      id: Date.now().toString(),
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString(),
      notified: false
    };
    setTasks(prev => [...prev, newTask]);
    showNotification('Task berhasil ditambahkan!', 'success');
    setShowForm(false);
  };

  const updateTask = (taskId, updates) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    ));
    showNotification('Task berhasil diperbarui!', 'success');
    setEditingTask(null);
    setShowForm(false);
  };

  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
    showNotification('Task berhasil dihapus!', 'success');
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const startEditing = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const cancelEditing = () => {
    setEditingTask(null);
    setShowForm(false);
  };

  const calculateProgress = () => {
    if (tasks.length === 0) return 0;
    const completedTasks = tasks.filter(task => task.completed).length;
    return Math.round((completedTasks / tasks.length) * 100);
  };

  const handleLogout = () => {
    showNotification('Berhasil logout!', 'success');
    setTimeout(() => {
      onLogout();
    }, 1000);
  };

  const handleAddTask = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const overdueTasks = tasks.filter(task => {
    if (task.completed || !task.deadline) return false;
    return new Date(task.deadline) < new Date();
  }).length;

  return (
    <div className="task-manager">
      <div className="task-manager-container">
        {/* Header */}
        <header className="task-manager-header">
          <div className="header-left">
            <h1 className="app-title">PlanIt Dashboard</h1>
            <p className="app-subtitle">Kelola tugas Anda dengan mudah dan efisien</p>
            
            <div className="quick-stats">
              <div className="stat-item">
                <span className="stat-value">{totalTasks}</span>
                <span className="stat-label">Total Task</span>
              </div>
              <div className="stat-item">
                <span className="stat-value success">{completedTasks}</span>
                <span className="stat-label">Selesai</span>
              </div>
              <div className="stat-item">
                <span className="stat-value warning">{overdueTasks}</span>
                <span className="stat-label">Terlambat</span>
              </div>
            </div>
          </div>
          
          <div className="header-right">
            <Clock />
            <div className="header-actions">
              <button 
                className="logout-button"
                onClick={handleLogout}
              >
                <span className="button-icon">←</span>
                Logout
              </button>
              <button 
                className="add-task-button"
                onClick={handleAddTask}
              >
                <span className="button-icon">+</span>
                Tambah Task
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="task-manager-content">
          <div className="main-content">
            {showForm ? (
              <div className="form-section">
                <div className="form-header">
                  <h2 className="form-title">
                    {editingTask ? 'Edit Task' : 'Tambah Task Baru'}
                  </h2>
                  <button 
                    className="close-form-button"
                    onClick={cancelEditing}
                  >
                    ✕
                  </button>
                </div>
                <TaskForm 
                  task={editingTask}
                  onSave={editingTask ? updateTask : addTask}
                  onCancel={cancelEditing}
                />
              </div>
            ) : (
              <div className="list-section">
                <div className="list-header">
                  <h2 className="list-title">Daftar Task Anda</h2>
                  <div className="list-summary">
                    <span className="summary-text">
                      {totalTasks} task • {completedTasks} selesai • {overdueTasks} terlambat
                    </span>
                  </div>
                </div>
                <TaskList 
                  tasks={tasks}
                  onEdit={startEditing}
                  onDelete={deleteTask}
                  onToggleComplete={toggleTaskCompletion}
                />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="sidebar">
            <ProgressChart 
              tasks={tasks}
              progress={calculateProgress()}
            />
            
            {/* Quick Tips Section */}
            <div className="quick-tips">
              <h3 className="tips-title">💡 Tips Produktif</h3>
              <ul className="tips-list">
                <li className="tip-item">Prioritaskan task dengan deadline terdekat</li>
                <li className="tip-item">Break down task besar menjadi sub-task kecil</li>
                <li className="tip-item">Gunakan reminder untuk deadline penting</li>
                <li className="tip-item">Review progress harian di akhir hari</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <Notification 
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      {/* Loading Overlay */}
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <span className="loading-text">Memuat task...</span>
        </div>
      )}
    </div>
  );
};

export default TaskManager;