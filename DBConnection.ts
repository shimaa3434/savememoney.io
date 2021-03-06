const SQLConnection = require('mysql');

const Database = SQLConnection.createConnection({
    host: 'localhost',
    database: 'buildapcdeals',
    user: 'root',
    password: '123456'
})

Database.connect((err:any) => {
    if (err) console.log(err);
    if (!err) console.log('Connected to Database.')
})

module.exports = Database;