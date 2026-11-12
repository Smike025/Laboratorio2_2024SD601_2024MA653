const pool = require('../config/db');

// Obtener el TOP N de productos más vendidos
exports.getTopProductos = async (req, res, next) => {
    try {
        // Puedes pasar un límite por query string, ej: /api/reportes/top-productos?limit=5 (por defecto 5)
        const limit = parseInt(req.query.limit) || 5;

        const [rows] = await pool.query(
            `SELECT p.id_producto, p.nombre, SUM(d.cantidad) AS total_vendido
             FROM detalles_pedidos d
             JOIN productos p ON d.id_producto = p.id_producto
             GROUP BY p.id_producto, p.nombre
             ORDER BY total_vendido DESC
             LIMIT ?`,
            [limit]
        );
        res.json(rows);
    } catch (error) {
        next(error);
    }
};