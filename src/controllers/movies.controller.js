const { render } = require('../../app');
const movieService=require('../services/movie.service');

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
    create: (req, res, next) => {
        if (req.method === 'GET') {
            movieService.getLanguages((err, languages) => {
            // console
            if (err) return next(err);
            res.render('movies/details', {
                languages: languages,
                title: 'Create Movie',
                action: '/movies/create'
            });
            });
        } else {
        // console.log(req.body);

            movieService.create(req.body, (err, movie) => {
                if (err) return next(err);
                req.session.success = 'Movie created successfully';
                res.redirect('/movies');
            });
        }
    },
    get:(req,res,next)=>{
        let movieId=req.params.movieId;
        movieService.get(movieId,(err,movies)=>{
            // console.log(err);
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
        if (req.method === 'GET') {
            movieService.get(movieId, (err, movieResult) => {
                // console.log(movieResult[0].film_id);
            if (err) return next(err);
            const movie = movieResult[0]; // assuming movieService.get returns [[row], ...]
            if (!movie) return res.status(404).send('Movie not found');
            movieService.getLanguages((err, languages) => {
                if (err) return next(err);
                res.render('movies/details', {
                movie: movie,
                languages: languages,
                title: 'Edit Movie',
                action: `/movies/${movie.film_id}/update`
                });
            });
            });
        } else {
            movieService.update(
            movieId,
            title,
            description,
            release_year,
            rental_duration,
            rental_rate,
            length,
            replacement_cost,
            rating,
            special_features,
            language,
            (err, movies) => {
                if (err) return next(err);
                if (movies) {
                    req.session.success = 'Movie updated successfully';
                    res.redirect(`/movies/${movieId}/details`);
                }
            }
        );
        }
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