const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Users = db.define('users', { // <--- Nama variabel di sini 'Users'
    username: {
        type: DataTypes.STRING,
        allowValue: false
    },
    email: {
        type: DataTypes.STRING,
        allowValue: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowValue: false
    }
}, {
    freezeTableName: true
});

// PASTIKAN DI SINI SAMA DENGAN NAMA DI ATAS
module.exports = Users;