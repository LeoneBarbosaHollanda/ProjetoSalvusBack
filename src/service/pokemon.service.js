// pokemon.service.js
const knex = require("knex");
const knexConfig = require("../database/knexfile");

class PokemonService {
    constructor() {
        this.db = knex(knexConfig.development);
    }

    async create(pokemonData) {
        return this.db("pokemon").insert(pokemonData);
    }

    async findAll() {
        return this.db("pokemon").select("*");
    }

    async findOne(id) {
        return this.db("pokemon").where({ id }).first();
    }

    async update(id, pokemonData) {
        await this.db("pokemon").where({ id }).update(pokemonData);
        return this.db("pokemon").where({ id }).first();
    }

    async remove(id) {
        return this.db("pokemon").where({ id }).del();
    }
}

module.exports = PokemonService;
