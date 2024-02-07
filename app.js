const express = require('express');
const fileRoutes = require('./routers/files.router');

const app = express();
const PORT = 3000;
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'File Management API',
            version: '1.0.0',
            description: 'A simple API for managing files'
        },
        servers: [
            {
                url: 'http://localhost:3000',
            }
        ]
    },
    apis: ['./routers/files.router.js'],
};


const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(cors());


app.use(express.json());

app.use('/files', fileRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/api-docs`);
});
