var express = require('express');
var router = express.Router();

const userController=require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');

/* GET users listing. */
router.get('/',authController.isLoggedIn, userController.get);
router.get('/:userId',authController.isLoggedIn, userController.get);
router.delete('/:userId',authController.isLoggedIn, userController.delete);
module.exports = router;
