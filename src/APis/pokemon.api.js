//poekemon api 
const PokemonService = require('../service/pokemon.service');

class PokemonController {
    constructor() {
        this.pokemonService = new PokemonService();
    }

    create(req, res) {
        const pokemonData = req.body;
        console.log(req.body)
        this.pokemonService.create(pokemonData)
            .then(pokemon => res.json(pokemon))
            .catch(error => {
                let errorMessage;
                errorMessage = error.message;
                res.status(500).json({ error: errorMessage });
            });

    }

    findAll(req, res) {
        console.log(req.body)
        this.pokemonService.findAll()
            .then(pokemons => res.json(pokemons))
            .catch(error => res.status(500).json({ error: 'Error fetching Pokemon list' }));
    }

    findOne(req, res) {
        console.log(req.body)
        const id = req.params.id;
        this.pokemonService.findOne(id)
            .then(pokemon => res.json(pokemon))
            .catch(error => res.status(404).json({ error: 'Pokemon not found' }));
    }

    update(req, res) {
        const id = req.params.id;
        const pokemonData = req.body;
        console.log(req.body)
        this.pokemonService.update(id, pokemonData)
            .then(updatedPokemon => res.json(updatedPokemon))
            .catch(error => res.status(500).json({ error: 'Error updating Pokemon' }));
    }

    remove(req, res) {
        const id = req.params.id;
        console.log(req.body)
        this.pokemonService.remove(id)
            .then(() => res.status(204).send())
            .catch(error => res.status(500).json({ error: 'Error deleting Pokemon' }));
    }

    tradePokemons(req, res) {
        const { nameTrainer1, namePokemon1, namePokemon2, nameTrainer2 } = req.body;

        this.pokemonService
            .tradePokemon(nameTrainer1, namePokemon1, namePokemon2, nameTrainer2)
            .then(() => res.status(200).json({ success: true }))
            .catch(error => {
                console.log(namePokemon1)
                console.log(namePokemon2)
                console.log(nameTrainer1)
                console.log(nameTrainer2)
                let errorMessage;
                if (error instanceof Error && error.message) {
                    errorMessage = error.message;
                } else {
                    errorMessage = "Ocorreu um erro durante a troca de pokémon.";
                }
                console.error("Erro na troca de pokémon:", errorMessage);
                res.status(500).json({ success: false, error: errorMessage });
            });
    }
    findTrainerName(req, res) {
        this.pokemonService.findPokemonByTrainer(req.params.id)
            .then(pokemons => res.json(pokemons))

    }

}

module.exports = PokemonController;
