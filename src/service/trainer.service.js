// ptrainer.service.js
const knex = require("knex");
const knexConfig = require("../database/knexfile");
const SHA1 = require("../middleware/sha1")

class TrainerService {
    constructor() {
        this.db = knex(knexConfig.development);
    }

    async create(trainerData) {
        trainerData.senha = SHA1(trainerData.senha);
        const existingTrainer = await this.findNameTrainer(trainerData.nome);
        console.log(existingTrainer)
        if (existingTrainer) {
            throw new Error(`Já existe um treinador com o nome ${trainerData.nome}`);
        }
        trainerData.nome = trainerData.nome.charAt(0).toUpperCase() + trainerData.nome.slice(1);
        return this.db("trainer").insert(trainerData);
    }

    async findAll() {

        console.log("eba deu certo")
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
        const data = this.db("trainer").where({ nome }).first()
        console.log(data.nome)
        return this.db("trainer").where({ nome }).first();
    }
}

module.exports = TrainerService;