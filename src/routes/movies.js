var express = require('express');
var router = express.Router();

const moviesController=require('../controllers/movies.controller');
const userController = require('../controllers/user.controller');

/* GET users listing. */
router.get('/', moviesController.get);
router.get('/:movieId', moviesController.get);
router.get('/:movieId/details', moviesController.update);
router.post('/:movieId/update', moviesController.validate, moviesController.update);

router.delete('/:movieId', moviesController.delete);
module.exports = router;
