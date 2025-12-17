const Users = require('../models/User');
const bcrypt = require('bcryptjs');

// REGISTER
exports.register = async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    
    // Cek apakah password cocok
    if(password !== confirmPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});

    // Hash Password (enkripsi)
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    try {
        await Users.create({
            username: username,
            email: email,
            password: hashPassword
        });
        res.json({msg: "Register Berhasil"});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Email mungkin sudah digunakan"});
    }
}

// LOGIN
exports.login = async (req, res) => {
    try {
        const user = await Users.findOne({
            where: { email: req.body.email }
        });
        
        // Cek apakah email ada
        if (!user) return res.status(404).json({msg: "Email tidak ditemukan"});

        // Cek password
        const match = await bcrypt.compare(req.body.password, user.password);
        if(!match) return res.status(400).json({msg: "Password Salah"});

        // Kirim data user yang login
        res.status(200).json({ 
            id: user.id, 
            username: user.username, 
            email: user.email, 
            msg: "Login Berhasil" 
        });
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}