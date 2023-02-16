// logger
const mylogger = (req, res, next) => {
    console.log(`Request Method is ${req.method}`);
    console.log(`Request URL is ${req.url}`);
    next();
  };


  module.exports = mylogger;