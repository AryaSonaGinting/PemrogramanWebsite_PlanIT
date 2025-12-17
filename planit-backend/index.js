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
(async () => {
    try {
        await db.authenticate();
        console.log('Database Connected...');
        
        // --- PENTING ---
        // Hapus tanda komentar "//" di baris bawah ini HANYA saat pertama kali dijalankan.
        // Tujuannya untuk menyuruh database membuat tabel Users dan Tasks.
        // Setelah tabel jadi, kasih komentar "//" lagi ya.
        
        await db.sync(); 
        
    } catch (error) {
        console.error(error);
    }
})();

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});

module.exports = app;