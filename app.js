require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
app.disable('X-Powered-By');
const connectDB = require('./db/connect');
const productsRouter = require('./routes/products');
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');

// middleware
app.use(express.json());

// routes
app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
});

app.use('/api/v1/products', productsRouter);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server is listening to ${port}...`));
    } catch (error) {
        console.log(error);
    }
};

start();
