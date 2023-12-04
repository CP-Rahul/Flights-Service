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

module.exports = {
    createCity,
    getCities
}