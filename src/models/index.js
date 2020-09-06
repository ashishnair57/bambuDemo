'use strict';

const mysql = require("mysql");
const dbConfig = require("../../config/database.json");

var connection = mysql.createPool({
  host: dbConfig.development.host,
  user: dbConfig.development.username,
  password: dbConfig.development.password,
  database: dbConfig.development.database
});

module.exports = connection;