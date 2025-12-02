// src/models/task.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  category: { // <--- KOLOM BARU UNTUK KATEGORI
    type: DataTypes.STRING,
    allowNull: true, 
  },
  dueDate: {
    type: DataTypes.DATE,
  },
  priority: {
    type: DataTypes.ENUM('Low', 'Medium', 'High', 'Sedang', 'Tinggi', 'Rendah'), // Tambah ENUM sesuai frontend
    defaultValue: 'Medium',
  },
  isCompleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true,
});

module.exports = Task;