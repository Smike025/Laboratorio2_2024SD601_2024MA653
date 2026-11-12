const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Registrar las Rutas del CRUD
app.use('/api/usuarios', require('./routes/usuarioRoutes'));
app.use('/api/pedidos', require('./routes/pedidoRoutes'));
app.use('/api/usuarios', require('./routes/usuarioRoutes'));
app.use('/api/pedidos', require('./routes/pedidoRoutes'));
app.use('/api/detalles-pedidos', require('./routes/detallePedidoRoutes'));
app.use('/api/reportes', require('./routes/reporteRoutes'));

// Middleware global de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: 'Ocurrió un error en el servidor', 
        detalle: err.message 
    });
});

module.exports = app;