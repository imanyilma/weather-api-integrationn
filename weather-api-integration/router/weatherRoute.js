const express =require('express');
const router = express.Router();
const getWeather = require('../controller/weatherController')
const { protect } = require('../controller/userController');
router.get('/:city' ,protect , getWeather);

module.exports = router;
