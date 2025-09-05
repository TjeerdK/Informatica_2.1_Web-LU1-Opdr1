const userDao = require('../daos/user.dao');
// Ander bestand waarin je de logger gebruikt.
const logger = require("../util/logger");

const userService={
    get:(userId, callback)=>{
        userDao.get(userId, (err, users) =>{
            if(err) return callback(err, undefined);
            if(users){
                logger.debug("Hier je logmessage.");
                return callback(undefined, users);
            }
        });
    },
    delete:(userId, callback)=>{
        userDao.get(userId, (err, users) =>{
            if(err) return callback(err, undefined);
            let userIndex = users.findIndex(user => user.id == userId);
            if(userIndex === -1) return callback({message: 'User not found'}, undefined);
            users.splice(userIndex, 1);
            return callback(undefined, true);
        });
    },

}

module.exports=userService;
