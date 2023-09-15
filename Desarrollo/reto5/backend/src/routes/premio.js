const Premio = require('../models/premio');

const router = require('express').Router()


router.get('/', async (req, res) => {
    const premios = await Premio.findAll();

    res.json(premios);
});


router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const premio = await Premio.findByPk(id)

    if (!premio) {
        return res.json({
            status: "error",
            msj: "No existe ningun premio con el id proporcionado."
        });
    }

    res.json(premio);
});


router.post('/', async (req, res) => {
    const { idPremio, codigoPremio, nombrePremio, descPremio, valorPremio } = req.body;

    if (!codigoPremio || !nombrePremio || !descPremio || !valorPremio) {
        return res.json({
            status: "error",
            msj: "Uno o mas campos vacios."
        });
    }



    const codPremio = await Premio.findOne({ where: { codigoPremio } })
    if (codPremio) {
        return res.json({
            status: "error",
            msj: "Ya existe un premio con ese código."
        });
    }




    const premioC = await Premio.create({ idPremio, codigoPremio, nombrePremio, descPremio, valorPremio })

    res.json({
        status: "ok",
        msj: 'Premio creado exitosamente.',
        premio: premioC
    });
});




router.put('/:idPremio', async (req, res) => {
    const { idPremio, codigoPremio, nombrePremio, descPremio, valorPremio } = req.body;
    const premioId = await Premio.findByPk(idPremio);


    if (!idPremio) {
        return res.json({
            status: "error",
            msj: 'El premio a editar no existe.'
        });
    }


    if (codigoPremio != premioId.codigoPremio) {
        const codExists = await Premio.findOne({ where: { codigoPremio } });
        if (codExists) {
            return res.json({
                status: "error",
                msj: "Ya existe un premio con ese código."
            });
        }
    }



    await premioId.update({ idPremio, codigoPremio, nombrePremio, descPremio, valorPremio })

    res.json({
        status: "ok",
        msj: 'Premio actualizado con exito.',
        premio: premioId
    });
});


router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const premioId = await Premio.findByPk(id);

    if (!premioId) {
        return res.json({
            status: 'error',
            msj: 'El premio no existe o ya ha sido eliminado.'
        });
    }

    await premioId.destroy();

    res.json({
        status: 'ok',
        msj: 'Premio eliminado con exito.'
    });
});

module.exports = router