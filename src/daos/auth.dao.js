const database = require('../db/sql/connection');   
const authDao = {
    login:(email,callback)=>{
        const query = 'SELECT ??, ?? FROM ?? WHERE ?? = ?';
        database.query(query, ['email', 'password', 'staff', 'email', email], (err, user) => {
            console.log(user);
            if(!user || user.length === 0) return callback(new Error('Invalid email or password'), undefined);
            // console.log(err);
            if(err) return callback(err, undefined);
            if(user) return callback(undefined, user);
        });
    }
}

module.exports=authDao;