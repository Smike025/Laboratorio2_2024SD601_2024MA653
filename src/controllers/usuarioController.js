const pool = require('../config/db');

// Obtener todos o filtrar por nombre, apellido o correo
exports.getUsuarios = async (req, res, next) => {
    try {
        const { buscar } = req.query;
        let query = 'SELECT * FROM usuarios';
        let params = [];

        if (buscar) {
            query += ' WHERE nombre LIKE ? OR apellido LIKE ? OR correo LIKE ?';
            params = [`%${buscar}%`, `%${buscar}%`, `%${buscar}%`];
        }

        const [rows] = await pool.query(query, params);
        res.json(rows);
    } catch (error) {
        next(error);
    }
};

// Obtener por ID
exports.getUsuarioById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE id_usuario = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        res.json(rows[0]);
    } catch (error) {
        next(error);
    }
};

// Crear usuario
exports.createUsuario = async (req, res, next) => {
    try {
        const { nombre, apellido, correo, telefono } = req.body;
        const [result] = await pool.query(
            'INSERT INTO usuarios (nombre, apellido, correo, telefono) VALUES (?, ?, ?, ?)',
            [nombre, apellido, correo, telefono]
        );
        res.status(201).json({ id: result.insertId, nombre, apellido, correo, telefono });
    } catch (error) {
        next(error);
    }
};

// Actualizar usuario
exports.updateUsuario = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { nombre, apellido, correo, telefono } = req.body;
        await pool.query(
            'UPDATE usuarios SET nombre = ?, apellido = ?, correo = ?, telefono = ? WHERE id_usuario = ?',
            [nombre, apellido, correo, telefono, id]
        );
        res.json({ mensaje: 'Usuario actualizado correctamente' });
    } catch (error) {
        next(error);
    }
};

// Eliminar usuario
exports.deleteUsuario = async (req, res, next) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM usuarios WHERE id_usuario = ?', [id]);
        res.json({ mensaje: 'Usuario eliminado correctamente' });
    } catch (error) {
        next(error);
    }
};