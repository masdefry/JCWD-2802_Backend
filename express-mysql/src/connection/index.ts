import mysql from 'mysql2';

const db = mysql.createConnection({
    host: 'localhost', 
    user: 'root', 
    password: 'abc12345',
    database: 'titanic'
})

db.connect((err) => {
    if(err){
        return console.log(err)
    }

    console.log('Connected!')
})

export default db;