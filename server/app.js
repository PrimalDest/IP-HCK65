const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

const requestActivity = (req, res, next) => {
    console.log(`Received ${req.method} request at ${req.url}`);
    next();
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());


app.use(requestActivity);

const router = require('./routes/index');
app.use(router);


app.use((err, req, res, next) => {
    console.log(err, "<<<<<<<<<<<<<<<<");
    if (err.name === "JsonWebTokenError" && err.message === "invalid signature") {
        res.status(401).json({ error: 'Invalid token signature' });
    } else if (err.message === 'User not found' || err.message === 'Password not matched') {
        res.status(401).json({ error: 'Error login - User not found or password not matched' });
    } else if (err.message === 'Authentication error') {
        res.status(401).json({ error: 'Error authentication' });
    } else if (err.message === 'Forbidden error in authorization') {
        res.status(403).json({ error: 'Forbidden error in authorization' });
    } else if (err.name === 'ValidationError' || err.name === 'SequelizeValidationError') {
        const errorMessages = err.errors.map(error => error.message);
        res.status(400).json({ errors: errorMessages });
    } else if (err.message.includes('isEmail')) {
        res.status(400).json({ error: 'Invalid Format Email' });
    } else {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
