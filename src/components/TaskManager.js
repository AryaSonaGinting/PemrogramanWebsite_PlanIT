import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import ProgressChart from './ProgressChart';
import Notification from './Notification';
import Clock from './Clock';
import Profile from './Profile';
import CountdownTimer from './CountDownTimer'; // RESTORED IMPORT
import './TaskManager.css';

const TaskManager = ({ onLogout, onSwitchAccount }) => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [notification, setNotification] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState({ name: 'User', email: 'user@example.com' });

  // Load user data from session
  useEffect(() => {
    const sessionData = localStorage.getItem('planit-session');
    if (sessionData) {
      const session = JSON.parse(sessionData);
      if (session.user) {
        setUser(session.user);
      }
    }
  }, []);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('planit-tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks state changes
  useEffect(() => {
    localStorage.setItem('planit-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now(), completed: false }]);
    setShowForm(false);
    setNotification({ message: 'Task berhasil ditambahkan!', type: 'success' });
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
    setShowForm(false);
    setEditingTask(null);
    setNotification({ message: 'Task berhasil diupdate!', type: 'success' });
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    setNotification({ message: 'Task berhasil dihapus.', type: 'error' });
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
    // Optional: show notification
  };
  
  const startEditing = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };
  
  const cancelEditing = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const calculateProgress = () => {
    if (tasks.length === 0) return 0;
    const completed = tasks.filter(task => task.completed).length;
    return Math.round((completed / tasks.length) * 100);
  };

  // RESTORED: Find the closest deadline for CountdownTimer
  const closestDeadline = tasks
    .filter(task => !task.completed && task.deadline && new Date(task.deadline).getTime() > new Date().getTime())
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))[0]?.deadline;

  // Profile handling
  const handleShowProfile = () => setShowProfile(true);
  const handleCloseProfile = () => setShowProfile(false);

  // Helper for showing form from the button
  const handleShowForm = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  // Inline styles object
  const styles = {
    headerLeft: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      gap: '0.5rem',
      minWidth: '200px',
    },
    // headerRight can now be simple or empty, as the timer moved
    headerRight: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', 
      gap: '1rem',
      minWidth: '200px',
    },
    addTaskButton: {
      padding: '0.75rem 1.5rem',
      borderRadius: '25px',
      fontSize: '1rem',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      background: 'white',
      color: '#667eea',
      border: 'none',
      cursor: 'pointer',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    content: {
      display: 'flex',
      gap: '2rem',
      alignItems: 'flex-start',
      paddingTop: '2rem',
      flexWrap: 'wrap',
    },
    mainContent: {
      flex: 3,
      minWidth: '0',
    },
    sidebar: {
      flex: 1,
      minWidth: '350px',
    },
    profileButton: {
      position: 'absolute',
      top: '2rem',
      right: '2rem',
      background: 'rgba(255, 255, 255, 0.2)',
      padding: '0.5rem 1rem',
      borderRadius: '25px',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      zIndex: 100,
    },
    avatarSmall: {
      width: '24px',
      height: '24px',
      borderRadius: '50%',
      background: 'white',
      color: '#667eea',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.8rem',
      fontWeight: 'bold',
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      zIndex: 999,
    },
  };

  const AddTaskButton = (
    <button 
      className="add-task-button"
      onClick={() => {
        startEditing(null);
        handleShowForm();
      }}
      style={styles.addTaskButton} 
      onMouseEnter={(e) => {
        e.target.style.transform = 'translateY(-2px)';
        e.target.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
      }}
    >
      + Tambah Task
    </button>
  );

  return (
    <div className="task-manager">
      <div className="task-manager-container">
        {/* Profile Button */}
        <button 
          style={styles.profileButton}
          onClick={handleShowProfile}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.2)';
          }}
        >
          <div style={styles.avatarSmall}>U</div>
          <span>Profile</span>
        </button>

        {/* Header Styles */}
        <header className="task-manager-header">
          <div style={styles.headerLeft}>
            <Clock />
          </div>

          {/* NEW: Place the title H1 *outside* the headerLeft/headerRight divs */}
          <h1 className="app-title">PlanIT</h1>

          {/* headerRight is now empty */}
          <div style={styles.headerRight}>
          </div>
        </header>
        
        {/* NEW BUTTON POSITION: Above TaskList, visible when form is NOT showing */}
        {!showForm && !editingTask && ( 
          <div className="task-list-controls-above">
            {AddTaskButton}
          </div>
        )}

        <div style={styles.content} className="task-manager-content">
          <div style={styles.mainContent} className="task-manager-main-content">
            {showForm ? (
              <TaskForm 
                task={editingTask}
                onSave={editingTask ? updateTask : addTask}
                onCancel={cancelEditing}
              />
            ) : (
                <>
                    {/* NEW TIMER POSITION: Moved above TaskList */}
                    <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                        <CountdownTimer deadline={closestDeadline} />
                    </div>
                    
                    <TaskList 
                        tasks={tasks}
                        onEdit={startEditing}
                        onDelete={deleteTask}
                        onToggleComplete={toggleTaskCompletion}
                    />
                </>
            )}
          </div>

          <div style={styles.sidebar} className="task-manager-sidebar">
            <ProgressChart 
              tasks={tasks}
              progress={calculateProgress()}
            />
          </div>
        </div>
      </div>

      {showProfile && (
        <>
          <div style={styles.overlay} onClick={handleCloseProfile} />
          <Profile 
            user={user}
            onClose={handleCloseProfile}
            onLogout={onLogout}
            onSwitchToLogin={onSwitchAccount}
          />
        </>
      )}

      {notification && (
        <Notification 
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};

export default TaskManager;
