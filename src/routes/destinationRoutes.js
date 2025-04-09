const express = require('express');
const router = express.Router();
const destinationController = require('../controllers/destinationController');

// Получить все направления
router.get('/destinations', destinationController.getAllDestinations);

// Получить направление по ID
router.get('/destinations/:id', destinationController.getDestinationById);

// Создать новое направление
router.post('/destinations', destinationController.createDestination);

// Обновить направление по ID
router.put('/destinations/:id', destinationController.updateDestination);

// Удалить направление по ID
router.delete('/destinations/:id', destinationController.deleteDestination);

module.exports = router;
