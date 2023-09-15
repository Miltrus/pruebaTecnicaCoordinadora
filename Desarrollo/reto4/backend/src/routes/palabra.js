const Palabra = require('../models/palabra');
const Categoria = require('../models/categoria');
const Sequelize = require('sequelize');

const router = require('express').Router()


router.get('/categoria', async (req, res) => {
  try {
    const randomCategoria = await Categoria.findOne({
      order: Sequelize.literal('rand()')
    });
    res.json(randomCategoria);
  } catch (error) {
    res.json({ status: 'error', msj: 'Error al obtener la categoria' });
  }

})


router.get('/palabra/:idCategoria', async (req, res) => {
  const { idCategoria } = req.params;
  try {
    const randomPalabra = await Palabra.findOne({
      where: { idCategoria: idCategoria },
      order: Sequelize.literal('rand()')
    });

    res.json(randomPalabra);
  } catch (error) {
    res.json({ status: 'error', msj: 'Error al obtener la palabra' });
  }

});


module.exports = router