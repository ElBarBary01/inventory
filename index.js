const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors');
const dotenv = require('dotenv');

// routes
const products = require('./routes/api/products');

dotenv.config();
const app = express();

// cors
app.use(cors());

// Init Middleware
app.use(express.json({ extended: true }));

app.get('/', (req, res) => res.send('Hello world!'));

// use Routes
app.use('/api/products', products);

const port = process.env.PORT || 8082;

const handleConnection = () => {
app.listen(port, () => console.log(`Server running on port ${port}`));
}

mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(process.env.CONNECTION_URL, mongooseOptions, handleConnection)
