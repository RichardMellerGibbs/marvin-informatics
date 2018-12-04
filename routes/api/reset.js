// =============================================================================
// RESET ROUTE /api/reset
// =============================================================================
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const logger = require('../../utils/logger');

// Load Input Validation
const validateResetInput = require('../../validation/reset');

// Load User Model
const User = require('../../models/User');

// @route   POST api/reset
// @desc    Service for resetting password
// @access  Public with token
router.post('/:token', (req, res) => {
  logger.info('arrived in reset server route');

  const { errors, isValid } = validateResetInput(req.body);

  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  if (!req.params.token) {
    errors.reset = 'No token specified';
    return res.status(404).json(errors);
  }

  User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() }
  })
    .select('resetPasswordExpires')
    .exec(function(err, user) {
      if (err) {
        errors.reset = 'Password reset token is invalid or has expired';
        logger.info(`${errors.reset}`);
        responses.handleError(err, req, res);
        return res.status(404).json(errors);
      }

      if (!user) {
        errors.reset = 'No user found for the supplied token';
        logger.info(`${errors.reset}`);
        return res.status(404).json(errors);
      }

      logger.info(`Token found. Expiry date ${user.resetPasswordExpires}`);
      logger.info(`password ${req.body.password}`);

      user.password = req.body.password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
          if (err) throw err;
          user.password = hash;
          user.save(function(err) {
            if (err) {
              errors.reset = 'Error saving the user new password';
              logger.info(`${errors.reset}`);
              responses.handleError(err, req, res);
              return res.status(404).json(errors);
            }

            logger.info('Password saved');

            return res.status(200).json('New password saved successfully');
          });
        });
      });
    });
});

module.exports = router;
