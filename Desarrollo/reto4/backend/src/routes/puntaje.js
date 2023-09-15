const Puntaje = require('../models/puntaje');
const Usuario = require('../models/Usuario');
const Sequelize = require('sequelize');

const router = require('express').Router()


router.post('/', async (req, res) => {
  const { idUsuario, juego, puntaje, intentos, fecha } = req.body;

  const newPuntaje = await Puntaje.create({
    idUsuario: idUsuario,
    juego: juego,
    puntaje: puntaje,
    intentos: intentos,
    fecha: fecha
  });

  res.json({
    status: "ok",
    msj: "Puntaje creado exitosamente.",
    data: newPuntaje
  });
});


router.get('/ranking/:juego', async (req, res) => {
  const juego = req.params.juego;

  try {
    const ranking = await Puntaje.findAll({
      where: { juego },
      attributes: [
        'idUsuario',
        [Sequelize.fn('SUM', Sequelize.col('puntaje')), 'puntajeTotal']
      ],
      group: ['idUsuario'],
      order: [[Sequelize.literal('puntajeTotal'), 'DESC']],
      limit: 10
    });

    const usuarios = await Promise.all(ranking.map(async (registro) => {
      const usuario = await Usuario.findByPk(registro.idUsuario);
      return { nombre: usuario.nombreUsuario, puntaje: registro.dataValues.puntajeTotal };
    }));

    res.json({ status: 'ok', ranking: usuarios });

  } catch (error) {
    console.error(error);
    res.json({ status: 'error', msj: 'Error al obtener el ranking' });
  }
});




module.exports = router