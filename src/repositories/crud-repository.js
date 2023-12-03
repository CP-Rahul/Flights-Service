const { response } = require("express");

class CrudRepository{
    constructor(model){
        this.model = model
    }

    async create(data) {
        const response = await this.model.create(data);
        return response;
    }
    
    async get(data) {
        const response = await this.model.findByPk(data);
        return response;
    }

    async getAll() {
        const respone = await this.model.findAll();
        return respone;
    }

    async update(id, data) {
        const response = await this.create.model.update(data,{
            where: {
                id: id
            }
        })
        return response;
    }

    async destroy(data) {
        const response = await this.model.destroy({
            where: {
                id: data
            }
        })
        return response
    }
}

module.exports = CrudRepository;