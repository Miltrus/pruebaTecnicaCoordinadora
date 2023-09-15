const express = require("express");
const cors = require("cors");
const usuarios = require("./routes/usuario")
const auth = require('./routes/auth')
const puntaje = require('./routes/puntaje')
const ahorcado = require('./routes/palabra')
const db = require("./db/database");
const app = express();
const port = process.env.PORT || 8080;

(async () => {
    try {
        await db.authenticate()
        await db.sync();
        console.log("melos en la base de datos");
    } catch (error) {
        throw new Error(error)
    }

})()

app.use(express.json());

app.use(cors({
    origin: '*'
}));

app.use('/usuario', usuarios);

app.use('/auth', auth);

app.use('/puntaje', puntaje);

app.use('/ahorcado', ahorcado);


app.listen(port, () => {
    console.log("Server trotando en el puerto: ", port);
});