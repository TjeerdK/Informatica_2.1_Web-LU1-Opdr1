// const data = require('../db/example.data');
const { update, create } = require('../controllers/movies.controller');
const database = require('../db/sql/connection');
const movieDao = {
    getLanguages:(callback)=>{
        database.query(
            `SELECT * FROM ??;`, ['language'], (err, data) => {
                if(err) return callback(err, undefined);
                if(data) return callback(undefined, data);
            }
        )
    },
    create:(movieData, callback)=>{
        console.log(movieData.release_year);
        console.log('AAAAAAAAAAAAAAAAAAAAA')
        if(movieData.release_year === '' || movieData.release_year === undefined || isNaN(movieData.release_year)) movieData.release_year = null;
        database.query(
            `INSERT INTO ?? (??, ??, ??, ??, ??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
            ['film',
            'title', 'description', 'release_year', 'language_id', 'rental_duration', 'rental_rate', 'length', 'replacement_cost', 'rating', 'special_features',
            movieData.title,
            movieData.description,
            movieData.release_year,
            movieData.language,
            movieData.rental_duration,
            movieData.rental_rate,
            movieData.length,
            movieData.replacement_cost,
            movieData.rating,
            movieData.special_features,],
            (err, result) => {
                if(err) return callback(err, undefined);
                if(result) return callback(undefined, result);
            }
        )
    },
    get:(movieId, callback)=>{
        database.query(
            movieId == undefined 
            ? `
            SELECT 
            f.*,  
            GROUP_CONCAT(DISTINCT c.name ORDER BY c.name SEPARATOR ', ') AS categories,
            COUNT(i.inventory_id) AS inventory_count
            FROM film f
            JOIN film_category fc ON f.film_id = fc.film_id
            JOIN category c ON fc.category_id = c.category_id
            LEFT JOIN inventory i ON f.film_id = i.film_id
            GROUP BY f.film_id order by f.title;
                `
            : `SELECT f.*, l.name AS language_name
                FROM ?? f
                JOIN ?? l ON f.language_id = l.language_id
                WHERE f.film_id = ?;
                `, ['film','language', movieId], (err, data) => {
                if(err) return callback(err, undefined);
                if(data) return callback(undefined, data);
            }
        )
    },
    update:(movieId, movieData, callback)=>{
        console.log(movieData)
        if(movieData.release_year === '' || movieData.release_year === undefined || isNaN(movieData.release_year)) movieData.release_year = null;
        database.query(
            `UPDATE film SET 
                title = ?, 
                description = ?, 
                release_year = ?, 
                language_id = ?, 
                rental_duration = ?, 
                rental_rate = ?, 
                length = ?, 
                replacement_cost = ?, 
                rating = ?, 
                special_features = ?
            WHERE film_id = ?;`,
            [
                movieData.title,
                movieData.description,
                movieData.release_year,
                movieData.language_id,
                movieData.rental_duration,
                movieData.rental_rate,
                movieData.length,
                movieData.replacement_cost,
                movieData.rating,
                movieData.special_features,
                movieId
            ],
            (err, result) => {
                
                console.log(err);
                console.log(result);
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