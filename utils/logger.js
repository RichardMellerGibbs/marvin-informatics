const env = process.env.NODE_ENV || 'development';

const logger = {};

logger.info = message => {
  if (env === 'development') {
    console.log(message);
  }
};

module.exports = logger;
