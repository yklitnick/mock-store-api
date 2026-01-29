import dotenv from 'dotenv';
dotenv.config();
import 'express-async-errors';

import express from 'express';
const app = express();
app.disable('X-Powered-By');
import connectDB from './db/connect.js';
import productsRouter from './routes/products.js';
import notFound from './middleware/not-found.js';
import errorHandler from './middleware/error-handler.js';

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
