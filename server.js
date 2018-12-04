const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

const users = require('./routes/api/users');
const forgot = require('./routes/api/forgot');
const reset = require('./routes/api/reset');

const app = express();
const morgan = require('morgan');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Now moving mongo from local to cloud based atlas
//const http = require('http');
const db = require('./config/keys').mongoURI;

// CONNECT TO MONGO
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

//Use the node promise instead of the mongoose promise.
//mongoose.Promise = global.Promise;

//Logging to the terminal. Everything is logged before passing control.
app.use(morgan('dev'));

//Setup CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  //Just an options check by the client so return supported methods
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE');
    return res.status(200).json({});
  }
  next();
});

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

//const productRoutes = require('./api/routes/products');
//const orderRoutes = require('./api/routes/orders');

//Routes which handle requests
app.use('/api/users', users);
app.use('/api/forgot', forgot);
app.use('/api/reset', reset);
//app.use('/products', productRoutes);
//app.use('/orders', orderRoutes);

// Serve static assests if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

//Catch all requests not handled by the above routes
app.use((req, res, next) => {
  const error = new Error('route not found');
  error.status = 404;
  next(error);
});

//Catch everything where ever it occurs - this includes the error above for unknown requests
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
