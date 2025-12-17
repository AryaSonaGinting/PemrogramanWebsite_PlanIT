const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const pg = require('pg'); // <--- 1. WAJIB DITAMBAHKAN DI SINI

dotenv.config();

// Cek apakah kita sedang pakai URL Neon atau Localhost biasa
const db = process.env.DATABASE_URL
    ? new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        dialectModule: pg, // <--- 2. WAJIB DITAMBAHKAN DI SINI (Supaya Vercel sadar)
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
      })
    : new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USERNAME,
        process.env.DB_PASSWORD,
        {
            host: process.env.DB_HOST,
            dialect: 'postgres',
            dialectModule: pg // <--- Tambahkan juga di sini biar aman
        }
      );

module.exports = db;