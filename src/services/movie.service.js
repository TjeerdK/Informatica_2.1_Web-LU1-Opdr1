const { create } = require('../controllers/movies.controller');
const { getLanguages } = require('../daos/movie.dao');
const movieDao = require('../daos/movie.dao');
// Ander bestand waarin je de logger gebruikt.
const logger = require("../util/logger");
const {expect} = require('chai');

const movieService={
    validate:(movieId, title, description, release_year, rental_duration, rental_rate, length, replacement_cost, rating, special_features, language, callback)=>{
        //validate using chai
        try {
            // expect(movieId).to.be.a('string', 'movieId must be a string');
            expect(title, 'title must not be empty').to.not.be.empty;
            expect(description, 'description must not be empty').to.not.be.empty;
            // expect(release_year, 'release_year must not be empty').to.not.be.empty;
            // expect(rental_duration, 'rental_duration must not be empty').to.not.be.empty;
            // expect(rental_rate, 'rental_rate must not be empty').to.not.be.empty;
            // expect(length, 'length must not be empty').to.not.be.empty;
            // expect(replacement_cost, 'replacement_cost must not be empty').to.not.be.empty;
            expect(rating, 'rating must not be empty').to.not.be.empty;
            expect(special_features, 'special_features must not be empty').to.not.be.empty;
            expect(language, 'language must not be empty').to.not.be.empty;

            expect(title).to.be.a('string', 'title must be a string');
            expect(description).to.be.a('string', 'description must be a string');
            expect(release_year).to.be.a('number', 'release_year must be a number');
            expect(rental_duration).to.be.a('number', 'rental_duration must be a number');
            expect(rental_rate).to.be.a('number', 'rental_rate must be a number');
            expect(length).to.be.a('number', 'length must be a number');
            expect(replacement_cost).to.be.a('number', 'replacement_cost must be a number');
            expect(rating).to.be.a('string', 'rating must be a string');
            expect(rating).to.be.oneOf(['G', 'PG', 'PG-13', 'R', 'NC-17'], 'rating must be one of G, PG, PG-13, R, NC-17');
            expect(special_features).to.be.a('string', 'special_features must be a string');
            expect(language).to.be.a('string', 'language must be a string');
            // callback(null, true);
            callback(undefined);
        } catch (error) {
            callback(error, null);
        }
        return callback(undefined, true);
    },
    create:(movieData, callback)=>{
        movieDao.create(movieData, (err, movies) =>{
            if(err) return callback(err, undefined);
            if(movies) return callback(undefined, movies);
        });
    },
    get:(movieId, callback)=>{
        movieDao.get( movieId, (err, movies) =>{
            if(err) return callback(err, undefined);
            if(movies){
                return callback(undefined, movies);
            }
        });
    },
    getLanguages:(callback)=>{
        movieDao.getLanguages( (err, languages) =>{
            if(err) return callback(err, undefined);
            if(languages){
                return callback(undefined, languages);
            }
        });
    },
    update:(movieId, title, description, release_year, rental_duration, rental_rate, length, replacement_cost, rating, special_features, language_id , callback)=>{
        const movieData = { title, description, release_year, rental_duration, rental_rate, length, replacement_cost, rating, special_features, language_id };
        movieDao.update(movieId, movieData, (err, movies) =>{
            if(err) return callback(err, undefined);
            if(movies) return callback(undefined, movies);
        });
    },
    delete:(movieId, callback)=>{
        movieDao.delete(movieId, (err, movies) =>{
            if(err) return callback(err, undefined);
            return callback(undefined, movies);
        });
    },

}

module.exports=movieService;
