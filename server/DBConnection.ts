const SQLConnection = require('mysql');

const Database = SQLConnection.createConnection({
    host: 'eyw6324oty5fsovx.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    database: 'nf5wqzeuwg5xsj5r',
    user: 'a4t89ifpkit3u1ye',
    password: 's24tvk2ejpslkmnz'
})

Database.connect((err:any) => {
    if (err) console.log(err);
    if (!err) console.log('Connected to Database.')
})

module.exports = Database;