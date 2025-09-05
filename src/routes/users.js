var express = require('express');
var router = express.Router();

const userController=require('../controllers/user.controller');

/* GET users listing. */
router.get('/', userController.get);
router.get('/:userId', userController.get);
router.delete('/:userId', userController.delete);
module.exports = router;
