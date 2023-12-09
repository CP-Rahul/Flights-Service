const { Sequelize } = require('sequelize');

const CrudRepository = require("./crud-repository");
const { Flight, Airplane, City, Airport } = require('../models');

class FlightRepository extends CrudRepository{
    constructor() {
        super(Flight);
    }
    async getFlights(filter, sort) {
        const respone = await Flight.findAll({
            where: filter,
            order: sort,
            include: [
                {
                    model: Airplane,
                    require: true,
                    as: 'airplaneDetails'
                },
                {
                    model: Airport,
                    required: true,
                    as: 'departureAirport',
                    on : {
                        col1: Sequelize.where(Sequelize.col("Flight.departureAirportId"), "=", Sequelize.col("departureAirport.code"))
                    },
                    include: {
                        model: City,
                        required: true,
                    }
                },
                {
                    model: Airport,
                    required: true,
                    as: 'arrivalAirport',
                    on : {
                        col1: Sequelize.where(Sequelize.col("Flight.arrivalAirportId"), "=", Sequelize.col("arrivalAirport.code"))
                    },
                    include: {
                        model: City,
                        required: true,
                    }
                }
            ],
        });
        return respone;
    }
}

module.exports = FlightRepository;