const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Reservas de Autobuses",
      version: "1.0.0",
      description: "API REST para gestionar reservas de autobuses, usuarios y viajes",
    },
    servers: [
      { url: "http://localhost:3000/api" } // Cambiar si tienes otro host
    ],
  },
  apis: ['./src/features/**/*.routes.js'], // Ruta donde están tus rutas con comentarios JSDoc
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
