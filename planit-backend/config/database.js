const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const pg = require('pg'); 

dotenv.config();

const db = new Sequelize(
    process.env.DB_NAME,      // Mengambil dari DB_NAME di Vercel
    process.env.DB_USERNAME,  // Mengambil dari DB_USERNAME di Vercel
    process.env.DB_PASSWORD,  // Mengambil dari DB_PASSWORD di Vercel
    {
        host: process.env.DB_HOST, // Mengambil dari DB_HOST di Vercel
        dialect: 'postgres',
        dialectModule: pg,
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,           // WAJIB: Mengatasi error sslmode=require
                rejectUnauthorized: false // WAJIB: Agar Vercel bisa konek ke provider DB luar
            }
        }
    }
);

module.exports = database;