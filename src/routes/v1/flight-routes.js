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

router.get('/:id',
        FlightController.getFlight);

router.patch('/:id/seats',
        FlightController.updateSeats);
        
module.exports = router;