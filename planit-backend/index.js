const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db');
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
        return db.sync(); // Membuat tabel otomatis jika belum ada
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});

module.exports = app;