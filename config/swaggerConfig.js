const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Skynetrix Boilerplate API",
      version: "1.0.0",
      description: "Auto-generated documentation for the boilerplate microservice",
    },
    servers: [
      {
        url: "/api/v1/boilerplate",
        description: "Boilerplate API",
      },
    ],
  },
  apis: ["./src/routes/**/*.js", "./src/controllers/**/*.js", "./src/*.js"], // wherever your JSDoc lives
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;
