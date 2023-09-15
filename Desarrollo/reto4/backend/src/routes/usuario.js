const Usuario = require('../models/Usuario');

const router = require('express').Router()


router.get('/', async (req, res) => {
  const users = await Usuario.findAll();

  res.json(users);
});


router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await Usuario.findByPk(id);

  if (!user) {
    return res.json({
      status: "error",
      msj: "No existe ningun usuario con el id proporcionado."
    });
  }

  res.json(user);
});


module.exports = router