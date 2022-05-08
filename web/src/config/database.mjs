import { Sequelize } from 'sequelize'
import mysql2 from 'mysql2'
import dotenv from 'dotenv'
dotenv.config();

export const sequelize = new Sequelize({
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    dialect: 'mysql',
    dialectModule: mysql2

});


(async() => {

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    sequelize.close()
})