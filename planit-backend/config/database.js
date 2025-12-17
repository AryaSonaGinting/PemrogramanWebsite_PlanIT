const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const pg = require('pg'); 

dotenv.config();

// Cek apakah ada DATABASE_URL (untuk Vercel/Neon) atau variabel eceran (untuk Local)
const db = process.env.DATABASE_URL 
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      dialectModule: pg,
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
        dialectModule: pg
      }
    );

module.exports = db;