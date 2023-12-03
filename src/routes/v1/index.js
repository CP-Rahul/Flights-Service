const express = require('express');

const airplaneRoute = require('./airplane-routes');

const router = express.Router();

router.use('/airplanes', airplaneRoute);

module.exports = router;