import _Sequelize from 'sequelize';
const { Sequelize, DataTypes } = _Sequelize
import _dotenv from 'dotenv';
_dotenv.config()
//connection
export default new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
});
