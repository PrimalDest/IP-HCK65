const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authcontroller');
const Controller = require('../controllers/controller');

router.post('/login', AuthController.googleLogin);

router.get('/all', Controller.getAllUsers);

module.exports = router;
