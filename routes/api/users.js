const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const responses = require('../../middleware/responses.js');
const logger = require('../../utils/logger');

// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load User Model
const User = require('../../models/User');

// @route   GET api/users/test
// @desc    Tests get route
// @access  Public
//router.get("/test", (req, res) => res.json({ msg: "Users works" }));

// @route   POST api/users/register
// @desc    Register user
// @access  Public
// router.post('/register', (req, res) => {
//   const { errors, isValid } = validateRegisterInput(req.body);

//   // Check validation
//   if (!isValid) {
//     return res.status(400).json(errors);
//   }

//   User.findOne({ email: req.body.email }).then(user => {
//     if (user) {
//       errors.email = 'Email already exists';
//       return res.status(400).json(errors);
//     } else {
//       const newUser = new User({
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password
//       });

//       bcrypt.genSalt(10, (err, salt) => {
//         bcrypt.hash(newUser.password, salt, (err, hash) => {
//           if (err) throw err;
//           newUser.password = hash;
//           newUser
//             .save()
//             .then(user => res.json(user))
//             .catch(err => console.log(err));
//         });
//       });
//     }
//   });
// });

// @route   POST api/users/login
// @desc    Login user / returning JET token
// @access  Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      errors.email = 'User not found';
      return res.status(404).json(errors);
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        const payload = { id: user.id, name: user.name };
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );
      } else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
    });
  });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
//passport.authenticate("jwt", { session: false }),
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

// get all the Users (accessed at GET http://localhost:5000/api/users)
//Dont forget to protect this endpoint with authentication required
router.get('/', function(req, res) {
  logger.info('Processing api request to get all the users');

  User.find()
    .select()
    .sort('name')
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        users: docs
      });
    })
    .catch(err => {
      responses.handleError(err, req, res);
      logger.error('Error getting all users');
      res.status(500).json({
        error: err
      });
    });

  // User.find()
  //   .sort("name")
  //   .exec(function(err, users) {
  //     if (err) {
  //       responses.handleError(err, req, res);
  //       logger.error("Error getting all users");
  //       return res.status(400).json(errors);
  //     }

  //     res.json(users);
  //   });
});

//router.get("/test", (req, res) => res.json({ msg: "Users works" }));

module.exports = router;
