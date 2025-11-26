const express = require('express');
const mongoose = require('mongoose');
const passport = require('./passport');
const cors = require('cors');
const session = require('express-session');
const app = express();
const path = require('path');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
require("dotenv").config();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const PORT = process.env.PORT || 3000;
const mong = process.env.MONG;
app.use(express.json());
console.log('mong', mong);
const bodyParser = require('body-parser');
/*
app.use(bodyParser.json()); */
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
const port = 8001 || 3000;
mongoose.connect(mong)
    .then(() => {
        console.log('connected');
        app.listen(port, (error) => {
            if (error) {
                console.log(error);
            }
            console.log('listening');
        });
    })
    .catch((error) => {
        console.log('error', error);
    });
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
console.log('server');
const indexRouter = require('./routes/index.js');
app.use('/api', indexRouter);