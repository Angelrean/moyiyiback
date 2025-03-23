const express = require("express");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Ruta base
app.get("/", (req, res) => {
  res.json({ message: "Servidor funcionando correctamente" });
});

// Ruta de login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "1234") {
    res.status(200).json({ success: true, token: "fake-token-123" });
  } else {
    res.status(401).json({ success: false, message: "Usuario o contraseña incorrectos" });
  }
});

// Ruta de ubicación aleatoria del camión
app.get("/truck-location", (req, res) => {
  try {
    const randomLat = (Math.random() * (40.75 - 40.70) + 40.70).toFixed(5);
    const randomLng = (Math.random() * (-74.00 + 74.05) - 74.05).toFixed(5);

    res.status(200).json({
      truckId: "CAMION-123",
      latitude: randomLat,
      longitude: randomLng,
    });
  } catch (error) {
    console.error("Error al generar la ubicación:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Arranque del servidor
app.listen(port, () => {
  console.log(`✅ API corriendo en: http://localhost:${port}`);
});
