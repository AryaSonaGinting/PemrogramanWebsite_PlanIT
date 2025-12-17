const Users = require('../models/User');
const bcrypt = require('bcryptjs');

// REGISTER
exports.register = async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    
    // 1. Cek apakah semua field terisi
    if(!username || !email || !password) return res.status(400).json({msg: "Semua data harus diisi"});

    // 2. Cek apakah password cocok
    if(password !== confirmPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});

    // 3. Hash Password (enkripsi)
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    try {
        await Users.create({
            username: username,
            email: email.toLowerCase(), // Simpan email dalam huruf kecil semua
            password: hashPassword
        });
        res.json({msg: "Register Berhasil"});
    } catch (error) {
        console.log("Error Register:", error);
        res.status(500).json({msg: "Email sudah digunakan atau terjadi kesalahan server"});
    }
}

// LOGIN
exports.login = async (req, res) => {
    try {
        // Log untuk memantau data yang masuk ke server
        console.log("Mencoba Login untuk email:", req.body.email);

        // 1. Cari user berdasarkan email (paksa ke huruf kecil)
        const user = await Users.findOne({
            where: { email: req.body.email.toLowerCase() }
        });
        
        // 2. Cek apakah email ada
        if (!user) {
            console.log("Login Gagal: Email tidak ditemukan di database");
            return res.status(404).json({msg: "Email tidak ditemukan"});
        }

        // 3. Cek password
        const match = await bcrypt.compare(req.body.password, user.password);
        console.log("Hasil cek password (match):", match);

        if(!match) {
            console.log("Login Gagal: Password salah");
            return res.status(400).json({msg: "Password Salah"});
        }

        // 4. Kirim data user jika berhasil
        console.log("Login Berhasil untuk:", user.username);
        res.status(200).json({ 
            id: user.id, 
            username: user.username, 
            email: user.email, 
            msg: "Login Berhasil" 
        });

    } catch (error) {
        console.error("Login Error:", error.message);
        res.status(500).json({msg: "Terjadi kesalahan pada server: " + error.message});
    }
}