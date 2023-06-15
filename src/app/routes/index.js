const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  try {
    const data = {
      uptime: process.uptime(),
      message: 'running',
      date: new Date()
    }
    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
});

module.exports = router;