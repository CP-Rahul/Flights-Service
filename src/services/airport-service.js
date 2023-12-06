const { StatusCodes } = require('http-status-codes');

const  { AirportRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');

const airportRepositorty = new AirportRepository();

async function createAirport(data) {
    try {
        const airport = await airportRepositorty.create(data);
        return airport;
    } catch (error) {
        if(error.name == 'SequelizeUniqueConstraintError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create the airport', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirports() {
    try {
        const airports = await airportRepositorty.getAll();
        return airports;
    } catch (error) {
        throw new AppError('Cannot fetch data of all airports', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirport(id) {
    try {
        const airport = await airportRepositorty.get(id);
        return airport;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The requested airport is not found', error.statusCode);
        }
        throw new AppError('Cannot fetch data of requested airport', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyAirport(data) {
    try {
        const airport = await airportRepositorty.destroy(data);
        return airport;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The requested airport with this is is not found for delete', error.statusCode);
        }
        throw new AppError('Cannot delete the requested airport', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createAirport,
    getAirports,
    getAirport,
    destroyAirport
}