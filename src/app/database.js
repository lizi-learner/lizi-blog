const mysql = require('mysql2');
const config = require('./config');

//建立连接池
const connections = mysql.createPool({
  host: config.MYSQL_HOST,
  port: config.MYSQL_PORT,
  database: MYSQL_DATABASE,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD
});

module.exports = connections.promise();