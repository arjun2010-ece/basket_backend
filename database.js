const mysql = require("mysql2");

module.exports = mysql.createConnection({
    host: "localhost",
    user: "arjun",
    password: "123456789a#",
    database: "market"
})

// 123456789a
// CREATE USER 'arjun'@'localhost' IDENTIFIED BY '123456789a#';
// GRANT ALL PRIVILEGES ON * . * TO 'arjun'@'localhost';