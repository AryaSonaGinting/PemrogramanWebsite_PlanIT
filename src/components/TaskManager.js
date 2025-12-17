import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import ProgressChart from './ProgressChart';
import Notification from './Notification';
import Clock from './Clock';
import Profile from './Profile';
import CountdownTimer from './CountDownTimer';
import './TaskManager.css';

const TaskManager = ({ onLogout, onSwitchAccount }) => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [notification, setNotification] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState(null);

  const API_URL = 'https://planit-backend-two.vercel.app/tasks';

  // 1. Ambil data User dari session login
  useEffect(() => {
    const sessionData = localStorage.getItem('planit-session');
    if (sessionData) {
      const session = JSON.parse(sessionData);
      if (session.user) {
        setUser(session.user);
      }
    }
  }, []);

  // 2. Fungsi Ambil Data dari Neon (Database)
  const fetchTasks = useCallback(async () => {
    if (!user?.id) return;
    try {
      const response = await axios.get(`${API_URL}?userId=${user.id}`);
      setTasks(response.data);
    } catch (err) {
      console.error("Gagal mengambil task:", err);
    }
  }, [user]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // 3. Fungsi Tambah Task ke Neon
  const addTask = async (taskData) => {
    try {
      const response = await axios.post(API_URL, {
        ...taskData,
        userId: user.id
      });
      setNotification({ message: 'Task tersimpan di Database!', type: 'success' });
      setShowForm(false);
      fetchTasks(); // Refresh list
    } catch (err) {
      setNotification({ message: 'Gagal simpan ke database', type: 'error' });
    }
  };

  // 4. Fungsi Update Task di Neon
  const updateTask = async (updatedTask) => {
    try {
      await axios.put(`${API_URL}/${updatedTask.id}`, updatedTask);
      setNotification({ message: 'Task diperbarui!', type: 'success' });
      setShowForm(false);
      setEditingTask(null);
      fetchTasks();
    } catch (err) {
      setNotification({ message: 'Gagal update task', type: 'error' });
    }
  };

  // 5. Fungsi Hapus Task dari Neon
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${API_URL}/${taskId}`);
      setNotification({ message: 'Task dihapus dari database', type: 'error' });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleTaskCompletion = async (task) => {
    try {
      await axios.put(`${API_URL}/${task.id}`, {
        ...task,
        completed: !task.completed
      });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // --- Logika UI (Sama seperti sebelumnya) ---
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
    const completed = tasks.filter(t => t.completed).length;
    return Math.round((completed / tasks.length) * 100);
  };

  const closestDeadline = tasks
    .filter(t => !t.completed && t.deadline && new Date(t.deadline).getTime() > Date.now())
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))[0]?.deadline;

  const handleShowProfile = () => setShowProfile(true);
  const handleCloseProfile = () => setShowProfile(false);

  const styles = {
    headerLeft: { display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: '200px' },
    headerRight: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', minWidth: '200px' },
    addTaskButton: { padding: '0.75rem 1.5rem', borderRadius: '25px', fontSize: '1rem', fontWeight: '600', background: 'white', color: '#667eea', border: 'none', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' },
    content: { display: 'flex', gap: '2rem', paddingTop: '2rem', flexWrap: 'wrap' },
    mainContent: { flex: 3, minWidth: '0' },
    sidebar: { flex: 1, minWidth: '300px' },
    profileButton: { position: 'absolute', top: '2rem', right: '2rem', background: 'rgba(255,255,255,0.2)', padding: '0.5rem 1rem', borderRadius: '25px', color: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600', zIndex: 100 },
    avatarSmall: { width: '24px', height: '24px', borderRadius: '50%', background: 'white', color: '#667eea', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' },
    overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 999 }
  };

  return (
    <div className="task-manager">
      <div className="task-manager-container">
        <button style={styles.profileButton} onClick={handleShowProfile}>
          <div style={styles.avatarSmall}>{user?.username?.charAt(0).toUpperCase() || 'U'}</div>
          <span>Profile</span>
        </button>

        <header className="task-manager-header">
          <div style={styles.headerLeft}><Clock /></div>
          <h1 className="app-title">PlanIT</h1>
          <div style={styles.headerRight}></div>
        </header>

        {!showForm && (
          <div className="task-list-controls-above">
            <button style={styles.addTaskButton} onClick={() => setShowForm(true)}>+ Tambah Task</button>
          </div>
        )}

        <div style={styles.content} className="task-manager-content">
          <div style={styles.mainContent}>
            {showForm ? (
              <TaskForm
                task={editingTask}
                onSave={editingTask ? updateTask : addTask}
                onCancel={cancelEditing}
              />
            ) : (
              <>
                <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                  <CountdownTimer deadline={closestDeadline} />
                </div>
                <TaskList
                  tasks={tasks}
                  onEdit={startEditing}
                  onDelete={deleteTask}
                  onToggleComplete={(id) => {
                    const t = tasks.find(x => x.id === id);
                    toggleTaskCompletion(t);
                  }}
                />
              </>
            )}
          </div>

          <div style={styles.sidebar}>
            <ProgressChart tasks={tasks} progress={calculateProgress()} />
          </div>
        </div>
      </div>

      {showProfile && (
        <>
          <div style={styles.overlay} onClick={handleCloseProfile} />
          <Profile user={user} onClose={handleCloseProfile} onLogout={onLogout} onSwitchToLogin={onSwitchAccount} />
        </>
      )}

      {notification && (
        <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />
      )}
    </div>
  );
};

export default TaskManager;
