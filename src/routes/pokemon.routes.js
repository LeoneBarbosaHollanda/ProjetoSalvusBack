// routes.js
const express = require('express');
const PokemonController = require('../APis/pokemon.api');

const router = express.Router();
const pokemonController = new PokemonController();

router.post('/pokemons', (req, res) => pokemonController.create(req, res));
router.get('/pokemons', (req, res) => pokemonController.findAll(req, res));
router.get('/pokemons/:id', (req, res) => pokemonController.findOne(req, res));
router.put('/pokemons/:id', (req, res) => pokemonController.update(req, res));
router.delete('/pokemons/:id', (req, res) => pokemonController.remove(req, res));
router.post('/trade', (req, res) => pokemonController.tradePokemons(req, res));

module.exports = router;
