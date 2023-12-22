const { User, Rating } = require('../models');
const { Op } = require('sequelize');
const { cloudinary } = require('../middlewares/uploadmiddleware');
const axios = require('axios');

class Controller {

  static async getAllUsers(req, res, next) {
    try {
      const users = await User.findAll({
        attributes: {
          exclude: ['password'],
        },
        order: [['id', 'ASC']],
      });
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  static getTopRatedMovies = async (req, res, next) => {
    const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkY2FlZDhjN2YwNzUyOTliYjE4ZDQ5NmRmZGM5ZTdkOCIsInN1YiI6IjY1NzdkZDg4YmJlMWRkMDBmZTJjMzY1MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OYoseG8GPVLwPOLkPnriarAow70EaxmL2EL2qfQoH94';

    try {
      const page = req.query.page || 1;
      const pageSize = req.query.pageSize || 20;

      const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/top_rated',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        params: {
          page: page,
          language: 'en-US',
          page_size: pageSize,
        },
      };

      const response = await axios.request(options);
      res.status(200).json(response.data);
    } catch (error) {
      next(error);
    }
  };

  static async getDetailedMovies(req, res, next) {
    const { id } = req.params;
    console.log(id);
    const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkY2FlZDhjN2YwNzUyOTliYjE4ZDQ5NmRmZGM5ZTdkOCIsInN1YiI6IjY1NzdkZDg4YmJlMWRkMDBmZTJjMzY1MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OYoseG8GPVLwPOLkPnriarAow70EaxmL2EL2qfQoH94';

    const options = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
    };

    try {
      const response = await axios.request(options);
      if (!response.data) {
        return res.status(404).json({ error: 'Movie not found' });
      }
      res.status(200).json(response.data);
    } catch (error) {
      next(error);
    }
  }

  static async createRating(req, res, next) {
    try {
      const { userId, rating, imdbid } = req.body;
      const newRating = await Rating.create({ userId, rating, imdbid });
      return res.status(201).json(newRating);
    } catch (error) {
      next(error);
    }
  }

  static async getAllRatings(req, res, next) {
    try {
      const ratings = await Rating.findAll();

      if (!ratings || ratings.length === 0) {
        return res.status(404).json({ error: 'Ratings not found' });
      }

      return res.status(200).json(ratings);
    } catch (error) {
      next(error);
    }
  }

  static async getRatingById(req, res, next) {
    const { id } = req.params;

    try {
      const rating = await Rating.findByPk(id);

      if (!rating) {
        return res.status(404).json({ error: 'Rating not found' });
      }

      return res.status(200).json(rating);
    } catch (error) {
      next(error);
    }
  }

  static async updateRating(req, res, next) {
    const { id } = req.params;

    try {
      const rating = await Rating.findByPk(id);

      if (!rating) {
        return res.status(404).json({ error: 'Rating not found' });
      }
      console.log(req.body);
      const [updatedRows] = await Rating.update(req.body, { where: { id } });
      if (updatedRows === 0) {
        return res.status(500).json({ error: 'Failed to update rating' });
      }

      return res.status(200).json({ message: 'Rating updated successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async deleteRating(req, res, next) {
    const { id } = req.params;
    try {
      const deletedRows = await Rating.destroy({
        where: { id },
      });
      if (deletedRows === 0) {
        return res.status(404).json({ error: 'Rating not found' });
      }
      return res.status(204).json();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
