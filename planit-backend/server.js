// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// 1. Konfigurasi
dotenv.config();

// 2. Import Model DULU (Menggunakan huruf kecil sesuai nama file)
const User = require('./src/models/user'); 
const Task = require('./src/models/task'); 

// 3. Definisikan Relasi
User.hasMany(Task, { foreignKey: 'UserId' }); 
Task.belongsTo(User, { foreignKey: 'UserId' }); 

// 4. Import Koneksi DB
const { connectDB } = require('./src/config/db');

// 5. Import Routes (SESUAIKAN DENGAN NAMA FILE ANDA)
const authRoutes = require('./src/routes/authRoutes'); 
const taskRoutes = require('./src/routes/taskRoutes'); 

// 6. Inisialisasi Aplikasi Express
const app = express();

// 7. Middleware
app.use(express.json()); 
app.use(cors()); 

// 8. Definisi Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// 9. Jalankan Koneksi Database dan Server
connectDB().then(() => {
    const PORT = process.env.PORT || 5002; // Menggunakan port terakhir yang berhasil (misal 5002)
    app.listen(
      PORT,
      console.log(`Server running on port ${PORT}`)
    );
}).catch(err => {
    console.error("Failed to start server:", err);
});