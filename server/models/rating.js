'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    static associate(models) {
      Rating.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }

  Rating.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'User ID cannot be null.',
          },
        },
      },
      rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Rating cannot be null.',
          },
          isFloat: {
            msg: 'Rating must be a valid number.',
          },
          min: {
            args: [0],
            msg: 'Rating must be greater than or equal to 0.',
          },
          max: {
            args: [10],
            msg: 'Rating must be less than or equal to 10.',
          },
        },
      },
      imdbid: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'IMDb ID cannot be null.',
          },
          notEmpty: {
            msg: 'IMDb ID cannot be empty.',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Rating',
    }
  );

  return Rating;
};
