const { create } = require('../controllers/movies.controller');
const { getLanguages } = require('../daos/movie.dao');
const movieDao = require('../daos/movie.dao');
// Ander bestand waarin je de logger gebruikt.
const logger = require("../util/logger");
const {expect} = require('chai');

const movieService={
    validate:(movieId, title, description, release_year, rental_duration, rental_rate, length, replacement_cost, rating, special_features, language, callback)=>{
        //validate using chai
        const DateTime = Date.now();

        try {
            //title
            expect(title, 'title must not be empty').to.not.be.empty;
            expect(title).to.be.a('string', 'title must be a string');

            //description (nullable)
            expect(description).to.be.a('string', 'description must be a string');

            //release year (nullable)
            // expect(release_year, 'release_year must not be empty').to.not.be.NaN;
            console.log(release_year);
            if (!isNaN(release_year)) {
                expect(release_year).to.be.within(1900, new Date().getFullYear(), 'release_year must be between 1900 and now');
            }
            release_year = undefined;

            //rental duration
            expect(rental_duration).to.be.within(1, 365, 'rental duration must be between 1 and 365 days');
            expect(rental_duration, 'rental duration must not be empty').to.not.be.NaN;

            //rental rate
            expect(rental_rate).to.be.within(0.5, 999, 'rental rate must be higher than 0.5');
            expect(rental_rate, 'rental rate must not be empty').to.not.be.NaN;

            //length
            expect(length).to.be.within(1, 500, 'length must be between 1 and 500 minutes');
            expect(length, 'length must not be empty').to.not.be.NaN;

            //replacement cost
            expect(replacement_cost).to.be.within(1, 999, 'replacement cost must be higher than 1');
            expect(replacement_cost, 'replacement cost must not be empty').to.not.be.NaN;
            
            //rating (nullable)
            // expect(rating, 'rating must not be empty').to.not.be.empty;
            expect(rating).to.be.a('string', 'rating must be a string');
            expect(rating).to.be.oneOf(['G','PG','PG-13','R','NC-17', ''], 'rating must be one of G, PG, PG-13, R, NC-17');

            //special features (nullable)
            // expect(special_features, 'special_features must not be empty').to.not.be.empty;
            expect(special_features).to.be.a('string', 'special_features must be a string');
            if (special_features !== '') {
                expect(special_features).to.satisfy((features) => {
                    const validFeatures = ['Trailers','Commentaries','Deleted Scenes','Behind the Scenes'];
                    const featuresArray = features.split(',').map(f => f.trim());
                    return featuresArray.every(f => validFeatures.includes(f));
                });
            }

            //language
            expect(language, 'language must not be empty').to.not.be.empty;
            callback(undefined);
        } catch (error) {
            let errorMessage = new Error(error.message.split(':')[0]);
            callback(errorMessage, null);
        }
        return callback(undefined, true);
    },
    create:(movieData, callback)=>{
        // if (isNaN(movieData.release_year)) movieData.release_year = null;
        if (movieData.rating === '') movieData.rating = null;
        if (movieData.special_features === '') movieData.special_features = null;
        console.log(movieData.release_year);
        // console.log(null);
        console.log('BBBBBBBBBBBBBBBBBBBBBBB');
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
        // Convert empty string to null for rating and special_features
        console.log(special_features)
        console.log('features')
        // if (release_year === NaN) release_year = null;
        if (rating === '') rating = null;
        if (special_features === '') special_features = null;
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
