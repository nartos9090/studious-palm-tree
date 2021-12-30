const mysql_module = require('mysql')
const mysql = mysql_module.createConnection({
    host    : '127.0.0.1',
    user    : 'root',
    password: '123',
    database: 'pemvis_spp',
})

mysql.connect()

module.exports = {
    mysql,
}