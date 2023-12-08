const express = require('express');

const { FlightController } = require('../../controllers');
const { FlightMiddlewares } = require('../../middlewares');

const router = express.Router();

router.post('/',
        FlightMiddlewares.validateCreateRequest,
        FlightMiddlewares.validateTime,
        FlightController.createFlight);

router.get('/',
        FlightController.getFlights);

module.exports = router;