const { render } = require('../../app');
const movieService=require('../services/movie.service');
const logger = require("../util/logger");

const moviesController={
    validate:(req,res,next)=>{
        let movieId=req.params.movieId;
        let { title, description, release_year, rental_duration, rental_rate, length, replacement_cost, rating, special_features, language } = req.body;
        if(!req.body) return next({message: 'Invalid request body'});
        movieService.validate(movieId, title, description, parseInt(release_year), parseInt(rental_duration), parseFloat(rental_rate), parseInt(length), parseFloat(replacement_cost)   , rating, special_features, language, (err, result)=>{
            if(err) return next(err);
            if(result) next();
            // red.redirect(`/movies/${movieId}/details`, err); //niet hier doen want dan redirect die altijd
        });
    },
    get:(req,res,next)=>{
        let movieId=req.params.movieId;
        movieService.get(movieId,(err,movies)=>{
            if(err) next(err);
            console.log(movies);
            if(movies){
                movieId == undefined
                ? res.render('movies/movies', { movies })
                : res.render('movies/details', { movie : movies[0] });
            }   
        });
    },
    update:(req,res,next)=>{
        let movieId=req.params.movieId;
        let { title, description, release_year, rental_duration, rental_rate, length, replacement_cost, rating, special_features, language } = req.body;
        req.method == 'GET'
        ?
        movieService.get(movieId, (err,movies)=>{
            if(err) next(err);
            if(movies) res.render('movies/details', { movie : movies[0][0], languages: movies[1]})
        })
        :
        movieService.update(movieId, title, description, release_year, rental_duration, rental_rate, length, replacement_cost, rating, special_features, language , (err,movies)=>{
            if(err) next(err);
            if(movies) res.redirect(`/movies/${movieId}/details`);
            // if(movies) res.render('movies/details', { movie : movies[0][0], languages: movies[1]});
        })
        
    },
    delete:(req,res,next)=>{
        let movieId=req.params.movieId;
        movieService.delete(movieId,(err,result)=>{
            if(err) return next(err);
            if(result){
                res.json({
                    status:200,
                    message: `Movie deleted`,
                    data: [],
                });
            }
        });
    },


}

module.exports=moviesController;