var express = require('express');
var router = express.Router();

const moviesController=require('../controllers/movies.controller');
const authController = require('../controllers/auth.controller');


router.get('/:movieId/details', moviesController.update);
router.get('/add', moviesController.create);

/* GET movies listing. */
router.get('/', authController.isLoggedIn, moviesController.get);
router.get('/:movieId', authController.isLoggedIn, moviesController.get);
router.post('/create', authController.isLoggedIn, moviesController.validate, moviesController.create);
router.post('/:movieId/update', authController.isLoggedIn, moviesController.validate, moviesController.update);

router.delete('/:movieId', authController.isLoggedIn, moviesController.delete);
module.exports = router;
