const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Conexión con la base de datos
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "galeria_db",
});

db.connect((err) => {
  if (err) {
    console.error("❌ Error de conexión a la base de datos:", err);
  } else {
    console.log("✅ Conectado a la base de datos");
  }
});

// Ruta para agregar imagen
app.post("/agregar-imagen", (req, res) => {
  const { nombre, descripcion, imagen, fecha } = req.body;
  const sql = "INSERT INTO imagenes (nombre, descripcion, imagen, fecha) VALUES (?, ?, ?, ?)";
  db.query(sql, [nombre, descripcion, imagen, fecha], (err) => {
    if (err) {
      console.error("❌ Error al insertar:", err);
      return res.status(500).send(err);
    }
    res.send({ message: "Imagen agregada correctamente" });
  });
});

// Ruta para obtener todas las imágenes
app.get("/obtener-imagenes", (req, res) => {
  db.query("SELECT * FROM imagenes ORDER BY fecha DESC", (err, results) => {
    if (err) {
      console.error("❌ Error al obtener imágenes:", err);
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// Ruta para eliminar imagen por ID
app.delete("/eliminar-imagen/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM imagenes WHERE id = ?";
  db.query(sql, [id], (err) => {
    if (err) {
      console.error("❌ Error al eliminar imagen:", err);
      return res.status(500).json({ error: "Error al eliminar imagen" });
    }
    res.json({ success: true });
  });
});

// Ruta para editar imagen
app.put("/editar-imagen/:id", (req, res) => {
  const id = req.params.id;
  const { nombre, descripcion, imagen } = req.body;
  const sql = "UPDATE imagenes SET nombre = ?, descripcion = ?, imagen = ? WHERE id = ?";
  db.query(sql, [nombre, descripcion, imagen, id], (err) => {
    if (err) {
      console.error("❌ Error al editar imagen:", err);
      return res.status(500).json({ error: "Error al editar imagen" });
    }
    res.json({ success: true });
  });
});

// Iniciar servidor
app.listen(3001, () => {
  console.log("🚀 Servidor backend corriendo en http://localhost:3001");
});
