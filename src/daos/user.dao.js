// const data = require('../db/example.data');
const database = require('../db/sql/connection');
const usersDao = {
    get:(userId, callback)=>{
        database.query(
            // userId == undefined 
            // ? `SELECT * FROM ?? ;`
            // : `SELECT * FROM ?? WHERE ?? = ?;`, 
            // userId == undefined ? ['customer'] : ['customer', 'customer_id', userId], (err, data) => {
            userId == undefined 
            ? `SELECT * FROM ?? ;`
            : `SELECT * FROM ?? WHERE ?? = ?;`, ['customer', 'customer_id', userId], (err, data) => {
                if(err) return callback(err, undefined);
                if(data) return callback(undefined, data);
            }
        )
    },
    delete:(userId, callback)=>{
        return callback(undefined, true);
    }
}

module.exports = usersDao;