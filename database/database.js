const Sequelize = require('sequelize');
const mysqlpassword = require('./secrets');

const connection = new Sequelize('guiapress', 'root', mysqlpassword, {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
});

module.exports = connection;

