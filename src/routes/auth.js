var express = require('express');
var router = express.Router();

const authController = require('../controllers/auth.controller');

router.get('/login', authController.login);
router.post('/login', authController.validate, authController.login);
router.get('/logout', authController.logout);

// router.get('/register', authController.register);
// router.post('/register', authController.validate, authController.register);

module.exports = router;