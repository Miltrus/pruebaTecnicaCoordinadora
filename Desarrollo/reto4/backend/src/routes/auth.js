const Usuario = require('../models/Usuario');
const router = require('express').Router();


router.post('/login', async (req, res) => {

    const { correoUsuario, contrasenaUsuario } = req.body;

    if (!correoUsuario || !contrasenaUsuario) {
        return res.json({
            status: "error",
            msj: "Correo y/o contraseña vacios."
        });
    }

    const user = await Usuario.findOne({ where: { correoUsuario } });

    try {
        if (!user) {
            return res.json({
                status: "error",
                msj: "Correo y/o contraseña incorrectos."
            });
        }

        if (user.contrasenaUsuario !== contrasenaUsuario) {
            return res.json({
                status: "error",
                msj: "Correo y/o contraseña incorrectos."
            });
        }

        res.json({
            status: "ok",
            msj: "User comprobado", user
        });

    } catch (error) {
        return res.status(500).json({
            status: 'error',
            msj: 'Error en el servidor.'
        });
    }

});


router.post('/register', async (req, res) => {

    const { nombreUsuario, correoUsuario, contrasenaUsuario } = req.body;

    if (!nombreUsuario || !correoUsuario || !contrasenaUsuario) {
        return res.json({
            status: "error",
            msj: "Campos vacios."
        });
    }

    const user = await Usuario.findOne({ where: { correoUsuario } });

    try {
        if (user) {
            return res.json({
                status: "error",
                msj: "El correo ya está registrado."
            });
        }

        await Usuario.create({ nombreUsuario, correoUsuario, contrasenaUsuario });

        res.json({
            status: "ok",
            msj: "User creado",
        });

    } catch (error) {
        return res.status(500).json({
            status: 'error',
            msj: 'Error en el servidor.'
        });
    }
});


module.exports = router