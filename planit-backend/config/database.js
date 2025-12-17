const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const pg = require('pg'); 

dotenv.config();

let db;

if (process.env.DATABASE_URL) {
    // Jika di Vercel pakai DATABASE_URL
    db = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        dialectModule: pg,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    });
} else {
    // Jika di Vercel pakai variabel eceran (Host, Name, User, Pass)
    db = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USERNAME,
        process.env.DB_PASSWORD,
        {
            host: process.env.DB_HOST,
            dialect: 'postgres',
            dialectModule: pg,
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false
                }
            }
        }
    );
}

module.exports = db;