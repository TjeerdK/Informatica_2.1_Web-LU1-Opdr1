// const data = require('../db/example.data');
const { update } = require('../controllers/movies.controller');
const database = require('../db/sql/connection');
const movieDao = {
    get:(movieId, callback)=>{
        database.query(
            movieId == undefined 
            ? `SELECT * FROM ?? LIMIT 10;`
            : `SELECT f.*, l.name AS language_name
                FROM ?? f
                JOIN ?? l ON f.language_id = l.language_id
                WHERE f.film_id = ?;
                SELECT * FROM ??;
                `, ['film','language', movieId , 'language'], (err, data) => {
                if(err) return callback(err, undefined);
                if(data) return callback(undefined, data);
            }
        )
    },
    update:(movieId, movieData, callback)=>{
        // console.log("is hier")
        database.query(
            `UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?;`, 
            ['film',
            'title', movieData.title,
            'description', movieData.description,
            'release_year', movieData.release_year, 
            'language_id', movieData.language_id,
            // 'original_language', movieData.original_language,
            'rental_duration', movieData.rental_duration,
            'rental_rate', movieData.rental_rate,
            'length', movieData.length,
            'replacement_cost', movieData.replacement_cost,
            'rating', movieData.rating,
            'special_features', movieData.special_features,
            'film_id', movieId], (err, result) => {
                if(err) return callback(err, undefined);
                if(result) return callback(undefined, result);
            }
        )
    },
    delete:(movieId, callback)=>{
        const sql = `
            START TRANSACTION;

            DELETE r FROM ?? r
            JOIN ?? i ON r.?? = i.??
            WHERE i.?? = ?;

            DELETE FROM ?? WHERE ?? = ?;
            DELETE FROM ?? WHERE ?? = ?;
            DELETE FROM ?? WHERE ?? = ?;

            DELETE FROM ?? WHERE ?? = ?;

            COMMIT;
            `;

        const params = [
            // rental join
            'rental', 'inventory', 'inventory_id', 'inventory_id', 'film_id', movieId,

            // inventory
            'inventory', 'film_id', movieId,

            // film_actor
            'film_actor', 'film_id', movieId,

            // film_category
            'film_category', 'film_id', movieId,

            // film
            'film', 'film_id', movieId
        ];
        database.query(sql, params, (err, result) => {
            if(err) return callback(err, undefined);
            if(result) return callback(undefined, result);
        })
    }
}

module.exports = movieDao;