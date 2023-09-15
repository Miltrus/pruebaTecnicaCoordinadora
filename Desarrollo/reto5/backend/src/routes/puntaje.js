const Puntaje = require('../models/puntaje');

const router = require('express').Router()


router.get("/", async (req, res) => {
    const puntaje = await Puntaje.findAll()

    res.json(puntaje);
});



router.get("/:id", async (req, res) => {
    const { id } = req.params
    const puntajeId = await Puntaje.findByPk(id)

    if (!puntajeId) {
        return res.json({
            error: "No existe el puntaje"
        });
    }

    res.json(puntajeId);
});


router.post("/", async (req, res) => {
    const { idEmpleado, idPremio, puntos } = req.body;


    await Puntaje.create({ idEmpleado, idPremio, puntos });

    res.json({
        status: "ok",
        msj: 'Puntaje creado exitosamente',
    });
});

router.put('/:idPuntaje', async (req, res) => {
    const { idPuntaje, idEmpleado, idPremio, puntos } = req.body;
    const puntajeId = await Puntaje.findByPk(idPuntaje);


    await puntajeId.update({ idPuntaje, idEmpleado, idPremio, puntos })

    res.json({
        status: "ok",
        msj: 'Puntaje actualizado con éxito',
    });
});


router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const puntajeId = await Puntaje.findByPk(id);

    if (!puntajeId) {
        return res.json({
            msj: 'El puntaje no existe o ya ha sido eliminado'
        });
    }

    await puntajeId.destroy();

    res.json({
        status: 'ok',
        msj: 'Puntaje eliminado con exito'
    });
});

module.exports = router;