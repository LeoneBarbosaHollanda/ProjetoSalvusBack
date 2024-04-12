// routes.js
const express = require('express');
const TrainerController = require('../APis/trainer.api');

const router = express.Router();
const trainerController = new TrainerController();

router.post('/trainers', (req, res) => trainerController.create(req, res));
router.get('/trainers', (req, res) => trainerController.findAll(req, res));
router.get('/trainers/:id', (req, res) => trainerController.findOne(req, res));
router.put('/trainers/:id', (req, res) => trainerController.update(req, res));
router.delete('/trainers/:id', (req, res) => trainerController.remove(req, res));

module.exports = router;
