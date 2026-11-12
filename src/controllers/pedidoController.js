const pool = require('../config/db');

// Obtener todos o filtrar por cliente (id_usuario)
exports.getPedidos = async (req, res, next) => {
    try {
        const { id_usuario } = req.query;
        let query = 'SELECT * FROM pedidos';
        let params = [];

        if (id_usuario) {
            query += ' WHERE id_usuario = ?';
            params = [id_usuario];
        }

        const [rows] = await pool.query(query, params);
        res.json(rows);
    } catch (error) {
        next(error);
    }
};

exports.getPedidoById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query('SELECT * FROM pedidos WHERE id_pedido = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ mensaje: 'Pedido no encontrado' });
        res.json(rows[0]);
    } catch (error) {
        next(error);
    }
};

exports.createPedido = async (req, res, next) => {
    try {
        const { id_usuario, estado, total } = req.body;
        const [result] = await pool.query(
            'INSERT INTO pedidos (id_usuario, estado, total) VALUES (?, ?, ?)',
            [id_usuario, estado || 'Pendiente', total || 0]
        );
        res.status(201).json({ id: result.insertId, id_usuario, estado, total });
    } catch (error) {
        next(error);
    }
};

exports.updatePedido = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { estado, total } = req.body;
        await pool.query(
            'UPDATE pedidos SET estado = ?, total = ? WHERE id_pedido = ?',
            [estado, total, id]
        );
        res.json({ mensaje: 'Pedido actualizado correctamente' });
    } catch (error) {
        next(error);
    }
};

exports.deletePedido = async (req, res, next) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM pedidos WHERE id_pedido = ?', [id]);
        res.json({ mensaje: 'Pedido eliminado correctamente' });
    } catch (error) {
        next(error);
    }
};