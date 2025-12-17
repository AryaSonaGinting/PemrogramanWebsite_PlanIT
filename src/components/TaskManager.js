import React, { useState, useEffect } from 'react';
import axios from 'axios'; // <--- Tambahkan Axios
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import ProgressChart from './ProgressChart';
import Notification from './Notification';
import Clock from './Clock';
import Profile from './Profile';
import CountdownTimer from './CountDownTimer';
import './TaskManager.css';

// TERIMA PROP 'user' dari Dashboard/App.js
const TaskManager = ({ onLogout, onSwitchAccount, user }) => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [notification, setNotification] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  // 1. FUNGSI AMBIL DATA DARI NEON
  const fetchTasksFromNeon = async () => {
    if (!user?.id) return;
    try {
      const response = await axios.get(`https://planit-backend-two.vercel.app/tasks?userId=${user.id}`);
      setTasks(response.data);
    } catch (err) {
      console.error("Gagal ambil data:", err);
    }
  };

  useEffect(() => {
    fetchTasksFromNeon();
  }, [user]);

  // 2. FUNGSI TAMBAH TASK KE NEON
  const addTask = async (taskData) => {
    try {
      const response = await axios.post('https://planit-backend-two.vercel.app/tasks', {
        title: taskData.title,
        description: taskData.description || "",
        category: taskData.category || "General",
        deadline: taskData.deadline || new Date(),
        priority: taskData.priority || "Medium",
        userId: user.id // <--- ID Pemilik
      });

      setNotification({ message: 'Task berhasil disimpan ke Neon!', type: 'success' });
      fetchTasksFromNeon(); // Refresh list
      setShowForm(false);
    } catch (err) {
      console.error("Gagal simpan:", err.response?.data);
      setNotification({ message: 'Gagal simpan ke database cloud.', type: 'error' });
    }
  };

  // 3. FUNGSI DELETE DARI NEON (Optional, jika kamu sudah buat route-nya)
  const deleteTask = async (taskId) => {
    try {
      // Pastikan kamu punya route DELETE /tasks/:id di backend
      // await axios.delete(`https://planit-backend-two.vercel.app/tasks/${taskId}`);
      setTasks(tasks.filter(task => task.id !== taskId));
      setNotification({ message: 'Task berhasil dihapus.', type: 'error' });
    } catch (err) {
      console.log(err);
    }
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  // Logika UI lainnya tetap sama
  const calculateProgress = () => {
    if (tasks.length === 0) return 0;
    const completed = tasks.filter(task => task.completed).length;
    return Math.round((completed / tasks.length) * 100);
  };

  const closestDeadline = tasks
    .filter(task => !task.completed && task.deadline && new Date(task.deadline).getTime() > new Date().getTime())
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))[0]?.deadline;

  // ... (Sisanya adalah fungsi UI yang sama dengan kodinganmu) ...
  const handleShowProfile = () => setShowProfile(true);
  const handleCloseProfile = () => setShowProfile(false);
  const handleShowForm = () => { setEditingTask(null); setShowForm(true); };
  const cancelEditing = () => { setShowForm(false); setEditingTask(null); };
  const startEditing = (task) => { setEditingTask(task); setShowForm(true); };

  // Styles (Sama seperti sebelumnya)
  const styles = {
    // ... (Gunakan styles yang sudah kamu buat tadi) ...
    profileButton: { position: 'absolute', top: '2rem', right: '2rem', background: 'rgba(255, 255, 255, 0.2)', padding: '0.5rem 1rem', borderRadius: '25px', color: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600', zIndex: 100 },
    avatarSmall: { width: '24px', height: '24px', borderRadius: '50%', background: 'white', color: '#667eea', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' },
    overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.5)', zIndex: 999 },
    addTaskButton: { padding: '0.75rem 1.5rem', borderRadius: '25px', background: 'white', color: '#667eea', border: 'none', cursor: 'pointer' },
    content: { display: 'flex', gap: '2rem', paddingTop: '2rem' },
    mainContent: { flex: 3 },
    sidebar: { flex: 1, minWidth: '400px' },
    headerLeft: { display: 'flex', alignItems: 'center', minWidth: '200px' },
    headerRight: { display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '200px' },
  };

  return (
    <div className="task-manager">
      <div className="task-manager-container">
        <button style={styles.profileButton} onClick={handleShowProfile}>
          <div style={styles.avatarSmall}>U</div>
          <span>{user?.name || 'Profile'}</span>
        </button>

        <header className="task-manager-header">
          <div style={styles.headerLeft}><Clock /></div>
          <h1 className="app-title">PlanIT</h1>
          <div style={styles.headerRight}></div>
        </header>

        {!showForm && (
          <div className="task-list-controls-above">
            <button onClick={handleShowForm} style={styles.addTaskButton}>+ Tambah Task</button>
          </div>
        )}

        <div style={styles.content} className="task-manager-content">
          <div style={styles.mainContent}>
            {showForm ? (
              <TaskForm
                task={editingTask}
                onSave={addTask}
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
                  onToggleComplete={toggleTaskCompletion}
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
