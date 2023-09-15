const express = require("express");
const cors = require("cors");

const empleados = require("./routes/empleado");
const premios = require("./routes/premio");
const puntajes = require("./routes/puntaje");

const db = require("./db/database");
const app = express();
const port = process.env.PORT || 5050;

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

app.use('/empleado', empleados);
app.use('/premio', premios);
app.use('/puntaje', puntajes);


app.listen(port, () => {
    console.log("Server trotando en el puerto: ", port);
});