const { User } = require('../models/index');
const { Op } = require('sequelize');
const { OAuth2Client } = require('google-auth-library');
const { generateToken } = require('../helper/jwt');
const client = new OAuth2Client();

class AuthController {

  static async googleLogin(req, res, next) {
    try {
      const { google_token } = req.body;

      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();

      const [user, created] = await User.findOrCreate({
        where: { email: payload.email },
        defaults: {
          username: payload.name,
          email: payload.email,
          password: Math.random().toString(),
          subscription: 'free',
        },
      });

      const access_token = generateToken({ id: user.id });

      res.status(created ? 201 : 200).json({
        message: `User ${user.email} found`,
        access_token: access_token,
      });
    } catch (err) {
      next(err);
    }
  }

}

module.exports = AuthController;
