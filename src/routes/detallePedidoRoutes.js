const express = require('express');
const router = express.Router();
const detalleController = require('../controllers/detallePedidoController');

router.get('/pedido/:id_pedido', detalleController.getDetallesByPedido);
router.post('/', detalleController.createDetalle);
router.delete('/:id', detalleController.deleteDetalle);

module.exports = router;