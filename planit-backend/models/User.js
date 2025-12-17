const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Users = db.define('users', {
    username: {
        type: DataTypes.STRING,
        allowNull: false // Pakai allowNull
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false, // Pakai allowNull
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false // Pakai allowNull
    }
}, {
    freezeTableName: true
});

module.exports = Users;