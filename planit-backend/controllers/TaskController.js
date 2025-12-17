const Tasks = require('../models/Task');

exports.createTask = async (req, res) => {
    try {
        const { title, description, category, deadline, priority, userId } = req.body;
        await Tasks.create({
            title, description, category, deadline, priority, userId
        });
        res.status(201).json({ msg: "Task Created" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

exports.getTasks = async (req, res) => {
    try {
        const { userId } = req.query;
        const response = await Tasks.findAll({
            where: { userId: userId }
        });
        res.json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
