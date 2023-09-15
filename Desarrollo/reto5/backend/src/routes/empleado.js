const Empleado = require('../models/empleado');
const Puntaje = require('../models/puntaje');
const { Op } = require('sequelize');

const router = require('express').Router()


router.get('/', async (req, res) => {
  const empleados = await Empleado.findAll();

  res.json(empleados);
});


router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const empleado = await Empleado.findByPk(id)

  if (!empleado) {
    return res.json({
      status: "error",
      msj: "No existe ningun empleado con el id proporcionado."
    });
  }

  res.json(empleado);
});


router.get('/puntajeTotal/:idEmpleado', async (req, res) => {
  const { idEmpleado } = req.params;

  const puntajeTotal = await Puntaje.sum('puntos', {
    where: {
      idEmpleado: idEmpleado
    }
  });

  res.json({ totalPuntos: puntajeTotal });
});



router.post('/', async (req, res) => {
  const { idEmpleado, documentoEmpleado, nameEmpleado, apellidoEmpleado, telEmpleado, emailEmpleado, cargoEmpleado } = req.body;

  if (!documentoEmpleado || !nameEmpleado || !apellidoEmpleado || !telEmpleado || !emailEmpleado || !cargoEmpleado) {
    return res.json({
      status: "error",
      msj: "Uno o mas campos vacios."
    });
  }



  const empleadoDoc = await Empleado.findOne({ where: { documentoEmpleado } })
  if (empleadoDoc) {
    return res.json({
      status: "error",
      msj: "Ya existe un empleado con ese documento."
    });
  }



  const email = await Empleado.findOne({ where: { emailEmpleado } })
  if (email) {
    return res.json({
      status: "error",
      msj: "El correo ya está en uso."
    });
  }


  const empleadoC = await Empleado.create({ idEmpleado, documentoEmpleado, nameEmpleado, apellidoEmpleado, telEmpleado, emailEmpleado, cargoEmpleado })

  res.json({
    status: "ok",
    msj: 'Empleado creado exitosamente.',
    empleado: empleadoC
  });
});




router.put('/:idEmpleado', async (req, res) => {
  const { idEmpleado, documentoEmpleado, nameEmpleado, apellidoEmpleado, telEmpleado, emailEmpleado, cargoEmpleado } = req.body;
  const empleadoId = await Empleado.findByPk(idEmpleado);


  if (!idEmpleado) {
    return res.json({
      status: "error",
      msj: 'El empleado a editar no existe.'
    });
  }


  if (documentoEmpleado != empleadoId.documentoEmpleado) {
    const cltExists = await Empleado.findOne({ where: { documentoEmpleado } });
    if (cltExists) {
      return res.json({
        status: "error",
        msj: "Ya existe un empleado con ese documento."
      });
    }
  }


  if (emailEmpleado !== empleadoId.emailEmpleado) {
    const emailExists = await Empleado.findOne({ where: { emailEmpleado } });
    if (emailExists) {
      return res.json({
        status: "error",
        msj: "El correo ya está en uso."
      });
    }
  }



  await empleadoId.update({ idEmpleado, documentoEmpleado, nameEmpleado, apellidoEmpleado, telEmpleado, emailEmpleado, cargoEmpleado });

  res.json({
    status: "ok",
    msj: 'Empleado actualizado con exito.',
    empleado: empleadoId
  });
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const empleadoId = await Empleado.findByPk(id);

  if (!empleadoId) {
    return res.json({
      status: 'error',
      msj: 'El empleado no existe o ya ha sido eliminado.'
    });
  }

  await empleadoId.destroy();

  res.json({
    status: 'ok',
    msj: 'Empleado eliminado con exito.'
  });
});

module.exports = router