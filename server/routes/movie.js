const express = require('express');
const router = express.Router();
const Controller = require('../controllers/controller');

router.get('/', Controller.getTopRatedMovies);

router.get('/:id', Controller.getDetailedMovies);

module.exports = router;
