const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/database');
const router = require('./routes/index');

// Kita panggil model di sini supaya tabel otomatis terbuat saat sync
const Users = require('./models/User'); 
const Tasks = require('./models/Task'); 

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Koneksi Database
db.authenticate()
    .then(() => {
        console.log('Database Connected...');
        return db.sync({ alter: true }); // 'alter' artinya menyuruh database menyesuaikan struktur tabel // Membuat tabel otomatis jika belum ada
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });

// Ganti baris app.use(cors()) yang lama dengan ini:
app.use(cors({
    origin: '*', // Mengizinkan semua domain (sementara untuk tes)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Tambahkan ini tepat di bawah app.use(cors...) 
// Untuk menangani request "Preflight" yang bikin error tadi
app.options(/(.*)/, cors());
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});

module.exports = app;
