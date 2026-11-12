const express = require('express');
const router = express.Router();
const reporteController = require('../controllers/reporteController');

router.get('/top-productos', reporteController.getTopProductos);

module.exports = router;