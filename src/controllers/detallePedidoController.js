const pool = require('../config/db');

// Obtener los detalles de un pedido específico
exports.getDetallesByPedido = async (req, res, next) => {
    try {
        const { id_pedido } = req.params;
        const [rows] = await pool.query(
            `SELECT d.*, p.nombre AS producto_nombre
             FROM detalles_pedidos d
             JOIN productos p ON d.id_producto = p.id_producto
             WHERE d.id_pedido = ?`,
            [id_pedido]
        );
        res.json(rows);
    } catch (error) {
        next(error);
    }
};

// Agregar un producto a un pedido
exports.createDetalle = async (req, res, next) => {
    try {
        const { id_pedido, id_producto, cantidad, precio_unitario } = req.body;
        const [result] = await pool.query(
            'INSERT INTO detalles_pedidos (id_pedido, id_producto, cantidad, precio_unitario) VALUES (?, ?, ?, ?)',
            [id_pedido, id_producto, cantidad, precio_unitario]
        );
        res.status(201).json({ id_detalle: result.insertId, id_pedido, id_producto, cantidad, precio_unitario });
    } catch (error) {
        next(error);
    }
};

// Eliminar un detalle de pedido
exports.deleteDetalle = async (req, res, next) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM detalles_pedidos WHERE id_detalle = ?', [id]);
        res.json({ mensaje: 'Detalle de pedido eliminado correctamente' });
    } catch (error) {
        next(error);
    }
};