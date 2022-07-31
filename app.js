const express = require('express');
const bodyParser = require('body-parser');

//  const tourRouter = require('./routes/tourRoutes');
const loginRoute = require('./routes/loginRoute')

//  Start express app
const app = express();

//  GLOBAL MIDDLEWARES
//  Global Middlewares will come here

//  Body parser, reading data from body into req.body
app.use(bodyParser.json());

//  ROUTES 
app.use('/', loginRoute);

module.exports = app;
