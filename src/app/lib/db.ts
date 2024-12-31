/* eslint-disable @typescript-eslint/no-require-imports */
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE as string,
    process.env.MYSQL_USER as string,
    process.env.MYSQL_PASSWORD as string,
    {
        host: process.env.MYSQL_HOST as string,
        dialect: 'mysql',
        logging: false,
        dialectModule: require('mysql2'),
    }
);

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('MySQL connected');
        await sequelize.sync({ alter: true });
    } catch (error) {
        console.error('Error connecting to MySQL:', error);
        throw new Error('Database connection failed');
    }
};

export default sequelize;
