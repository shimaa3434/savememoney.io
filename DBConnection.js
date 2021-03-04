const SQL = require('mysql');

const Database = SQL.createConnection({
    host: 'localhost',
    database: 'buildapcdeals',
    user: 'root',
    password: '123456'
})

Database.connect((err) => {
    if (err) console.log(err);
    if (!err) console.log('Connected to Database.')
})

module.exports = Database;