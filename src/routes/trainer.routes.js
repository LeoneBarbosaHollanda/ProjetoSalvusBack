// routes.js
const express = require('express');
const TrainerController = require('../APis/trainer.api');
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
const trainerController = new TrainerController();

router.post('/trainers', (req, res) => trainerController.create(req, res));
router.get('/trainers', (req, res) => trainerController.findAll(req, res));
router.get('/trainers/:id', (req, res) => trainerController.findOne(req, res));
router.put('/trainers/:id', authMiddleware(), (req, res, next) => trainerController.update(req, res, next));
router.delete('/trainers/:id', authMiddleware(), (req, res, next) => trainerController.remove(req, res, next));

module.exports = router;
