const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const pg = require('pg'); 

dotenv.config();

const db = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        dialectModule: pg,
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,           // Memaksa SSL aktif
                rejectUnauthorized: false // Penting agar Vercel bisa konek ke database luar
            }
        }
    }
);

module.exports = db;