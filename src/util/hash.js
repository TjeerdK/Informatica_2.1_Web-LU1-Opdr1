const bcrypt = require('bcrypt');
const hash={
    create: (password, callback)=>{
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) return callback("hashing failed");
            callback(undefined, hash);
        });
    },
    comparer: (enteredPassword, hashPassword, callback)=>{
        bcrypt.compare(enteredPassword, hashPassword, (err, result) => {
            if (err) return callback("decryption failed");
            callback(undefined, result);
        });
    }
}

module.exports=hash;

// // encrypt

// // decrypt
