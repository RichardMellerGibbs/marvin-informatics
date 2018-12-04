// =============================================================================
// FORGOT ROUTE /api/forgot
// =============================================================================
const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const keys = require('../../config/keys');
const sendgrid = require('sendgrid')(keys.sendGridApi);
const logger = require('../../utils/logger');

// Load User Model
const User = require('../../models/User');

// @route   GET api/forgot
// @desc    Service for forgetting password
// @access  Public
router.post('/', (req, res) => {
  let email = '';
  let errors = {};

  logger.info(`Processing api request to forgot route ${req.body.email}`);

  if (!req.body.email) {
    errors.email = 'Invalid email';
    logger.info(errors.email);
    return res.status(404).json(errors);
  }
  email = req.body.email;

  //Generate a random string which will become the token
  crypto.randomBytes(20, function(err, buf) {
    if (err) {
      errors.forgot = 'Failed to generate forgot token';
      logger.info(`${errors.forgot}`);
      responses.handleError(err, req, res);
      return res.status(404).json(errors);
    }

    //Continue
    var token = buf.toString('hex');
    logger.info(`token is ${token}`);

    //The email specified must exist in the database
    //models.User.findOne({username : userName}, function (err, user) {
    User.findOne({
      email: email
    })
      .select('email')
      .exec(function(err, user) {
        if (err) {
          errors.forgot = 'email could not be found';
          logger.info(`${errors.forgot}`);
          responses.handleError(err, req, res);
          return res.status(404).json(errors);
        }

        if (!user) {
          errors.email = 'User not found';
          logger.info(`${errors.email}`);
          return res.status(404).json(errors);
        }

        //errors.forgot = 'some other general error';
        //responses.handleError(errors, req, res);
        //return res.status(404).json(errors);

        logger.info('Found user now trying to save token');
        //Assign the token to the user schema along with an expiration date
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        //Save those details away
        user.save(function(err) {
          if (err) {
            errors.forgot = 'Error saving the token';
            logger.info(`${errors.forgot}`);
            responses.handleError(err, req, res);
            return res.status(404).json(errors);
          }

          logger.info(
            'Token saved now send the email. Headers %s',
            req.headers.host
          );

          let host =
            process.env.NODE_ENV === 'production'
              ? req.headers.host
              : 'localhost:3000';

          var emailText =
            'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            //'http://' + req.headers.host + '/reset/' + token + '\n\n' +
            'http://' +
            host +
            '/reset/' +
            token +
            '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n';

          //console.log("Message %s", emailText);
          //richardmellergibbs@gmail.com

          //Email the user with the instruction
          var sgEmail = new sendgrid.Email();
          sgEmail.from = 'Marvin-Informatics';
          sgEmail.subject = 'Password reset request';
          sgEmail.text = emailText;
          sgEmail.addTo(email);
          //sgEmail.addTo("richardmellergibbs@gmail.com");

          sendgrid.send(sgEmail, function(err, json) {
            if (err) {
              errors.forgot = 'Error sending the email';
              logger.info(`${errors.forgot}`);
              return res.status(404).json(errors);
            }

            //Continue
            logger.info(
              'Forgot email created and message sent: ' + JSON.stringify(json)
            );

            return res
              .status(200)
              .json('Forgot token generated and email sent');
          });
        });
      });
  });
});

module.exports = router;
