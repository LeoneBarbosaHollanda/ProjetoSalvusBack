// routes.js
const express = require('express');
const PokemonController = require('../APis/pokemon.api');
const authMiddleware = require("../middleware/authMiddleware"); // Importe o middleware de autenticação

const router = express.Router();
const pokemonController = new PokemonController();

// Aplique o middleware de autenticação nas rotas que exigem autenticação
router.post('/pokemons', authMiddleware(), (req, res, next) => pokemonController.create(req, res, next));
router.put('/pokemons/:id', authMiddleware(), (req, res, next) => pokemonController.update(req, res, next));
router.delete('/pokemons/:id', authMiddleware(), (req, res, next) => pokemonController.remove(req, res, next));
router.post('/trade', authMiddleware(), (req, res, next) => pokemonController.tradePokemons(req, res, next));

router.get('/pokemons', (req, res) => pokemonController.findAll(req, res));
router.get('/pokemons/:id', (req, res) => pokemonController.findOne(req, res));
router.get('/pokemons/trainer/:id', (req, res) => pokemonController.findTrainerName(req, res));

module.exports = router;
