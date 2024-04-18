//poekemon api 
const TrainerService = require('../service/trainer.service');

class TrainerController {
    constructor() {
        this.trainerService = new TrainerService();
    }

    create(req, res) {
        const trainerData = req.body;
        this.trainerService.create(trainerData)
            .then(trainer => res.json(trainer))
            .catch(error => {
                let errorMessage;
                errorMessage = error.message;
                res.status(500).json({ error: errorMessage });
            });
    }

    findAll(req, res) {
        console.log("passou aqui")
        this.trainerService.findAll()
            .then(trainers => res.json(trainers))
            .catch(error => res.status(500).json({ error: 'Error fetching Ptrainer list' }));
    }

    findOne(req, res) {
        const id = req.params.id;
        this.trainerService.findOne(id)
            .then(trainer => res.json(trainer))
            .catch(error => res.status(404).json({ error: 'Trainer not found' }));
    }

    update(req, res) {
        const id = req.params.id;
        const trainerData = req.body;
        this.trainerService.update(id, trainerData)
            .then(updatedTrainer => res.json(updatedTrainer))
            .catch(error => res.status(500).json({ error: 'Error updating Ptrainer' }));
    }

    remove(req, res) {
        const id = req.params.id;
        this.trainerService.remove(id)
            .then(() => res.status(204).send())
            .catch(error => res.status(500).json({ error: 'Error deleting Ptrainer' }));
    }

}

module.exports = TrainerController;
