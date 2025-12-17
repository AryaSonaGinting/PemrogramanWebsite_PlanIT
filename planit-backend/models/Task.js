const { DataTypes } = require('sequelize');
const db = require('../config/database'); // Pastikan path ini benar (titik dua .. artinya mundur 1 folder)
const Users = require('./User'); 

// PERBAIKAN: Gunakan db.define (bukan dsefine)
const Tasks = db.define('tasks', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    deadline: {
        type: DataTypes.DATE,
        allowNull: false
    },
    priority: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true
});

Users.hasMany(Tasks);
Tasks.belongsTo(Users, { foreignKey: 'userId' });

module.exports = Tasks;