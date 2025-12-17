const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const pg = require('pg'); 
dotenv.config();

const db = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectModule: pg,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});
module.exports = db;