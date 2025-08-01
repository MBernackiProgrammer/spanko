const pgp = require('pg-promise')();
const DBStatic = require('./DBStatic');

const DBConnection = pgp({
    host: DBStatic.host,
    port: DBStatic.port,
    database: DBStatic.database,
    user: DBStatic.username,
    password: DBStatic.password,
}) 

module.exports = DBConnection;