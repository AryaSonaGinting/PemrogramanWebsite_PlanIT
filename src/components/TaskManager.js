import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskManager = ({ onLogout, user }) => {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');

  // 1. FUNGSI AMBIL TASK DARI NEON
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`https://planit-backend-two.vercel.app/tasks/${user.id}`);
      setTasks(response.data);
    } catch (err) {
      console.error("Gagal mengambil task:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // 2. FUNGSI SIMPAN TASK KE NEON
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!taskTitle) return;

    try {
      await axios.post('https://planit-backend-two.vercel.app/tasks', {
        title: taskTitle,
        userId: user.id // <--- MENGIRIM ID PEMILIK TASK
      });
      setTaskTitle('');
      fetchTasks(); // Refresh list setelah simpan
      alert("Task berhasil disimpan ke Neon!");
    } catch (err) {
      console.error("Gagal simpan task:", err);
      alert("Gagal simpan ke database");
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Hello, {user?.name}!</h2>
      <form onSubmit={handleAddTask}>
        <input 
          value={taskTitle} 
          onChange={(e) => setTaskTitle(e.target.value)} 
          placeholder="Tambah tugas baru..." 
        />
        <button type="submit">Tambah</button>
      </form>

      <ul>
        {tasks.map(t => <li key={t.id}>{t.title}</li>)}
      </ul>
      
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default TaskManager;