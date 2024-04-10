//poekemon api 
const PokemonService = require('../service/pokemon.service');

class PokemonController {
    constructor() {
        this.pokemonService = new PokemonService();
    }

    create(req, res) {
        const pokemonData = req.body;
        this.pokemonService.create(pokemonData)
            .then(pokemon => res.json(pokemon))
            .catch(error => res.status(500).json({ error: 'Error creating Pokemon' }));
    }

    findAll(req, res) {
        this.pokemonService.findAll()
            .then(pokemons => res.json(pokemons))
            .catch(error => res.status(500).json({ error: 'Error fetching Pokemon list' }));
    }

    findOne(req, res) {
        const id = req.params.id;
        this.pokemonService.findOne(id)
            .then(pokemon => res.json(pokemon))
            .catch(error => res.status(404).json({ error: 'Pokemon not found' }));
    }

    update(req, res) {
        const id = req.params.id;
        const pokemonData = req.body;
        this.pokemonService.update(id, pokemonData)
            .then(updatedPokemon => res.json(updatedPokemon))
            .catch(error => res.status(500).json({ error: 'Error updating Pokemon' }));
    }

    remove(req, res) {
        const id = req.params.id;
        this.pokemonService.remove(id)
            .then(() => res.status(204).send())
            .catch(error => res.status(500).json({ error: 'Error deleting Pokemon' }));
    }
}

module.exports = PokemonController;
