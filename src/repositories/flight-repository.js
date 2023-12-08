const CrudRepository = require("./crud-repository");
const { Flight } = require('../models');

class FlightRepository extends CrudRepository{
    constructor() {
        super(Flight);
    }
    async getFlights(filter) {
        const respone = await Flight.findAll({
            where: filter
        });
        return respone;
    }
}

module.exports = FlightRepository;