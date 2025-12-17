const Tasks = require('../models/Task');

// LIHAT TASK
exports.getTasks = async (req, res) => {
    try {
        // Kita gunakan query atau params. Di sini kita coba pakai query
        const { userId } = req.query; 
        const response = await Tasks.findAll({
            where: { userId: userId } 
        });
        res.json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

// BUAT TASK BARU
exports.createTask = async (req, res) => {
    const { title, description, category, deadline, priority, userId } = req.body;

    try {
        // Tambahkan Log untuk cek data yang masuk di Vercel
        console.log("Data Task Masuk:", req.body);

        const newTask = await Tasks.create({
            title: title,
            description: description || "", // Kasih default kosong jika tidak diisi
            category: category || "General", 
            deadline: deadline || new Date(), 
            priority: priority || "Normal",
            userId: userId
        });
        res.status(201).json({msg: "Task Berhasil Dibuat", task: newTask});
    } catch (error) {
        console.error("Gagal Simpan Task:", error.message);
        res.status(500).json({msg: error.message});
    }
}