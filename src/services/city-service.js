const { StatusCodes } = require('http-status-codes');

const { CityRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');

const cityRepository = new CityRepository();

async function createCity(data) {
    try {
        const city = await cityRepository.create(data);
        console.log(city)
        return city;
    } catch (error) {
        console.log(error)
        if(error.name == 'SequelizeUniqueConstraintError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create the city object', StatusCodes.INTERNAL_SERVER_ERROR);    
    }
}

async function getCities() {
    try {
        const city = await cityRepository.getAll();
        return city;
    } catch (error) {
        throw new AppError('Canot fetch data of all cities', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getCity(id) {
    try {
        const city = await cityRepository.get(id);
        return city;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The requested city is not found', error.statusCode);
        }
        throw new AppError('Cannot fetch data of requested city', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateCity(data, id) {
    try {
        const city = await cityRepository.update(id, data);
        return city;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The requested city for update is not found', error.statusCode);
        }
        throw new AppError('Cannot update requested city', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyCity(id) {
    try {
        const city = await cityRepository.destroy(id);
        return city;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The requested city for delete is not found', error.statusCode);
        }
        console.log(error)
        throw new AppError('Cannot delete requested city', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createCity,
    getCities,
    getCity,
    updateCity,
    destroyCity
}