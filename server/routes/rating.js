const express = require('express');
const router = express.Router();
const Controller = require('../controllers/controller');

router.post('/', Controller.createRating);

router.get('/all', Controller.getAllRatings);

router.get('/:id', Controller.getRatingById);

router.put('/:id', Controller.updateRating);

router.delete('/:id', Controller.deleteRating);

module.exports = router;
