const express = require('express');
const router = express.Router();
const touristController = require('../controllers/touristController');

// Получить всех туристов
router.get('/tourists', touristController.getAllTourists);

// Получить туриста по ID
router.get('/tourists/:id', touristController.getTouristById);

// Создать нового туриста
router.post('/tourists', touristController.createTourist);

// Обновить туриста по ID
router.put('/tourists/:id', touristController.updateTourist);

// Удалить туриста по ID
router.delete('/tourists/:id', touristController.deleteTourist);

module.exports = router;
