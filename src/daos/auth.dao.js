const database = require('../db/sql/connection');   
const authDao = {
    login:(email,callback)=>{
        const query = 'SELECT ??, ?? FROM ?? WHERE ?? = ?';
        database.query(query, ['email', 'password', 'staff', 'email', email], (err, user) => {
            if(user[0] == undefined) return callback(new Error('User not found'), undefined);
            if(err) return callback(err, undefined);
            if(user) return callback(undefined, user);
        });
    }
}

module.exports=authDao;