'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Rating, { foreignKey: 'userId', as: 'ratings' });
    }
  }

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: 'Username cannot be null.',
          },
          notEmpty: {
            msg: 'Username cannot be empty.',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: 'Email cannot be null.',
          },
          notEmpty: {
            msg: 'Email cannot be empty.',
          },
          isEmail: {
            msg: 'Please provide a valid email address.',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Password cannot be null.',
          },
          notEmpty: {
            msg: 'Password cannot be empty.',
          },
        },
      },
      isPremium: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  return User;
};
