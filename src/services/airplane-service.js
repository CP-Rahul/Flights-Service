const { StatusCodes } = require('http-status-codes');

const { AirplaneRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');
const airplaneRepository = new AirplaneRepository();


async function createAirplane(data) {
    try {
        const airplane = await airplaneRepository.create(data);
        return airplane;
    } catch(error) {
        if(error.name == 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new Airplance object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirplanes() {
    try {
        const airplanes = await airplaneRepository.getAll();
        return airplanes;
    } catch (error) {
        throw new AppError('Cannot fetch data of all airplanes', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirplane(id) {
    try {
        const airplane = await airplaneRepository.get(id);
        return airplane;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The requested airplane is not found', error.statusCode);
        }
        throw new AppError('Cannot fetch data of requested airplane', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateAirplane(data, id) {
    try {
        const airplane = await airplaneRepository.update(id, data);
        return airplane;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The requested airplane with this id is not found for update', error.statusCode);
        }
        throw new AppError('Cannot update the requested airplane', StatusCodes.INTERNAL_SERVER_ERROR);   
    }
}

async function destroyAirplane(data) {
    try {
        const airplane = await airplaneRepository.destroy(data);
        return airplane;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The requested airplane with this is is not found for delete', error.statusCode);
        }
        throw new AppError('Cannot delete the requested airplane', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    updateAirplane,
    destroyAirplane
}