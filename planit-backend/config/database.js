const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const pg = require('pg'); 

dotenv.config();

// Konfigurasi Dialect Options untuk SSL (Penting untuk Vercel/Neon/Supabase)
const dialectOptions = {
    ssl: {
        require: true,
        rejectUnauthorized: false
    }
};

const db = process.env.DATABASE_URL
    ? new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        dialectModule: pg, 
        dialectOptions: dialectOptions // Pakai SSL jika ada DATABASE_URL
      })
    : new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USERNAME,
        process.env.DB_PASSWORD,
        {
            host: process.env.DB_HOST,
            dialect: 'postgres',
            dialectModule: pg,
            // Jika localhost biasanya tidak pakai SSL, tapi jika remote database (Neon) wajib pakai
            dialectOptions: process.env.DB_HOST !== 'localhost' ? dialectOptions : {}
        }
      );

module.exports = db;