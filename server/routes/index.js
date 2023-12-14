const express = require('express');
const router = express.Router();
const { authenticateToken } = require("../middlewares/authmiddleware")

const AuthRouter = require('./auth');
const RatingRouter = require('./rating');
const MovieRouter = require('./movie');

router.use('/user', AuthRouter);
router.use('/ratings', authenticateToken, RatingRouter);
router.use('/movie', authenticateToken, MovieRouter);

module.exports = router;
