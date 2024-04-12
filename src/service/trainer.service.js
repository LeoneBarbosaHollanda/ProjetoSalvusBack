// ptrainer.service.js
const knex = require("knex");
const knexConfig = require("../database/knexfile");

class TrainerService {
    constructor() {
        this.db = knex(knexConfig.development);
    }

    async create(trainerData) {
        const existingTrainer = await this.findNameTrainer(trainerData.nome);
        if (existingTrainer) {
            throw new Error(`Já existe um Pokémon com o nome ${trainerData.nome}`);
        }
        trainerData.nome = trainerData.nome.charAt(0).toUpperCase() + trainerData.nome.slice(1);
        return this.db("trainer").insert(trainerData);
    }

    async findAll() {
        return this.db("trainer").select("*");
    }

    async findOne(id) {
        return this.db("trainer").where({ id }).first();
    }

    async update(id, trainerData) {
        await this.db("trainer").where({ id }).update(trainerData);
        return this.db("trainer").where({ id }).first();
    }

    async remove(id) {
        return this.db("trainer").where({ id }).del();
    }
    async findNameTrainer(nome) {
        return this.db("trainer").where({ nome }).first();
    }
}

module.exports = TrainerService;
