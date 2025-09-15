var express = require('express');
var router = express.Router();

const moviesController=require('../controllers/movies.controller');

router.get('/:movieId/details', moviesController.update);

router.get('/add', moviesController.create);

/* GET movies listing. */
router.get('/', moviesController.get);
router.get('/:movieId', moviesController.get);


router.post('/create',moviesController.validate, moviesController.create);


router.post('/:movieId/update', moviesController.validate, moviesController.update);

router.delete('/:movieId', moviesController.delete);
module.exports = router;
