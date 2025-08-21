require('dotenv').config();
const express = require('express');
const { connectDB, sequelize } = require('./config/database');
const routes = require('./src/routes/index');
const errorHandler = require('./src/middlewares/errorHandler');
const setupSwagger = require("./swagger");
const cors = require('cors');

const app = express();

// Swagger
setupSwagger(app);

// Middleware de JSON
app.use(express.json());

// 🔹 Configuración CORS
app.use(cors({
  origin: 'http://localhost:4200', // Angular
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Rutas
app.use('/api', routes);

// Middleware de errores
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDB();

  // Sincronizar todos los modelos
  await sequelize.sync({ alter: true });

  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`Servidor Swagger corriendo en http://localhost:${PORT}/api/docs`);
  });
};

startServer();
