// Taller 8: CRUD completo + middlewares + express.Router
// Este es el servidor del Taller 7 (con cors). Sigue los pasos del README
// y completa cada sección marcada con un número.

const express = require("express");
const cors = require("cors");

const morgan = require("morgan");
const app = express();


app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());


const postsRouter = require("./routes/posts");

app.get("/", (req, res) => {
  res.send("¡Hola desde mi primer servidor con Express!");
});

app.get("/saludo/:nombre", (req, res) => {
  res.send(`¡Hola, ${req.params.nombre}!`);
});

app.use("/api/posts", postsRouter);


const endpointDesconocido = (req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
};

app.use(endpointDesconocido);


const manejadorErrores = (error, req, res, next) => {
  console.error(error.message);

  if (error.type === "entity.parse.failed") {
    return res.status(400).json({ error: "El cuerpo de la petición no es un JSON válido" });
  }

  res.status(500).json({ error: "Error interno del servidor" });
};
app.use(manejadorErrores);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});