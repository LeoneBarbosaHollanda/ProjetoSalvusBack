const knex = require("knex");
const knexConfig = require("../database/knexfile");
const TrainerService = require('./trainer.service');
 

class PokemonService {
    
    constructor() {
        this.db = knex(knexConfig.development);
        this.trainerService = new TrainerService();
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
    async findNamePokemon(nome) {
        return this.db("pokemon").where({ nome }).first();
    }

    async update(id, pokemonData) {
        await this.db("pokemon").where({ id }).update(pokemonData);
        return this.db("pokemon").where({ id }).first();
    }

    async remove(id) {
        return this.db("pokemon").where({ id }).del();
    }

    async tradePokemon(nameTrainer1, namePokemon1, namePokemon2, nameTrainer2) {
        
             
        const pokemon1 = await this.findNamePokemon(namePokemon1);
        const pokemon2 = await this.findNamePokemon(namePokemon2);
        const trainer1 = await this.trainerService.findNameTrainer(nameTrainer1);
        const trainer2 = await this.trainerService.findNameTrainer(nameTrainer2)


        if (pokemon1.treinadorId !== trainer1.id){
            console.log("Troca não deu certo no 1")
            throw new Error(`Treinador ${nameTrainer1} não tem o pokémon ${namePokemon1}`);
        }
        if (pokemon2.treinadorId !== trainer2.id){

            console.log("Troca não deu certo no 2")
            console.log(namePokemon2,nameTrainer2)
            throw new Error(`Treinador ${nameTrainer2} não tem o pokémon ${namePokemon2}`);
        }

        console.log("Troca deu certo")
        const aux = pokemon1.treinadorId
        pokemon1.treinadorId = pokemon2.treinadorId
        pokemon2.treinadorId = aux;

        await this.update(pokemon1.id,pokemon1)
        await this.update(pokemon2.id,pokemon2)
        return { success: true};
    
    
    }
    
}

module.exports = PokemonService;
