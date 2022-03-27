'use strict';

const express = require('express');
const app = express();
const morgan = require('morgan');
const tourRouter = require('./routes/Tours/tourRoutes');
const userRouter = require('./routes/Users/userRoutes');
// Middleware ////////////////////////////////////
// Loading the request body to the request,as JSON
app.use(morgan('dev'));
app.use(express.json());
// Middleware for serving all the static files that in the 'public' directory
app.use(express.static(`${__dirname}/public`));
// Routes Middleware /////////////////////////////
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
// Our middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

module.exports = app;
