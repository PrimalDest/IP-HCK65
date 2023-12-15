const express = require('express');
const router = express.Router();
const { authenticateToken } = require("../middlewares/authmiddleware")

const AuthRouter = require('./auth');
const RatingRouter = require('./rating');
const MovieRouter = require('./movie');

router.use('/user', AuthRouter);
router.use('/ratings', authenticateToken, RatingRouter);
router.use('/movie', authenticateToken, MovieRouter);

router.get('/', (req, res) => {
    res.send('Welcome! Please log in to access the application.');
});

module.exports = router;
