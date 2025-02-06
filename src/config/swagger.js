import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";


const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API de Tienda Online",
            version: "1.0.0",
            description: "Documentación de la API para gestión de productos, carritos y usuarios",
        },
        servers: [
            {
                url: "http://localhost:8080", 
                description: "Servidor local",
            },
        ],
    },
    apis: ["./src/routes/*.js"], 
};


const swaggerSpec = swaggerJSDoc(options);


const swaggerDocs = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log("Swagger Docs disponibles en: http://localhost:8080/api-docs");
};

export default swaggerDocs;