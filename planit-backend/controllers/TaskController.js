const Tasks = require('../models/Task');

// LIHAT TASK (Hanya milik user yang login)
exports.getTasks = async (req, res) => {
    try {
        const response = await Tasks.findAll({
            where: { userId: req.query.userId } // Filter berdasarkan userId
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
        await Tasks.create({
            title: title,
            description: description,
            category: category,
            deadline: deadline, 
            priority: priority,
            userId: userId
        });
        res.status(201).json({msg: "Task Berhasil Dibuat"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}