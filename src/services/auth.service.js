const authDao = require('../daos/auth.dao');
// Ander bestand waarin je de logger gebruikt.
const hash = require('../util/hash');

const authService={
    login:(email,password,callback)=>{
        authDao.login(email,(err,user)=>{
            if(err) return callback(err, undefined);
            hash.comparer(password, user[0].password, (err, isMatch) => {
                // console.log("auth service " + user);
                if (err) return callback(err, undefined);
                if (!isMatch) return callback(undefined, false);
                return callback(undefined, user);
            });
        });
    }

}

module.exports=authService;
