'use strict';

const express = require('express');
const app = express();
const fs = require('fs');
const morgan = require('morgan');

// Middleware ////////////////////////////////////
// Loading the request body to the request,as JSON
app.use(morgan('dev'));
app.use(express.json());
// Our middleware
app.use((req, res, next) => {
  console.log('Hello from the middleware 🤓🤟');
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
// Read data and returning JS object instead of the json format
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf8')
);

// Tours Handlers /////////////////////////
// Get All Tours /////////////////////////////////////
const getAllTours = (req, res) => {
  res.status(200).json({
    // sending the data in JSEND format/specification
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};
// Get A Tour /////////////////////////////////////
const getTour = (req, res) => {
  const requestedTour = tours.find(
    (tour) => tour.id === parseInt(req.params.id)
  );

  if (requestedTour) {
    res.status(200).json({
      // sending the data in JSEND format/specification
      status: 'success',
      data: {
        tour: requestedTour,
      },
    });
  } else {
    res.status(404).json({ status: 'fail', message: 'Tour not found 😫' });
  }
};
// Create a New Tour /////////////////////////////////////
const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = { id: newId, ...req.body };
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      console.log('Error when trying to write to DB 😫');
    }
  );
  res.status(201).json({
    // sending the data in JSEND format/specification
    status: 'success',
    data: {
      newTour,
    },
  });
};
// Update a Tour /////////////////////////////////////
const updateTour = (req, res) => {
  const requestedTour = tours.find(
    (tour) => tour.id === parseInt(req.params.id)
  );

  if (requestedTour) {
    res.status(200).json({
      // sending the data in JSEND format/specification
      status: 'success',
      data: {
        tour: '<updated tour....>',
      },
    });
  } else {
    res.status(404).json({ status: 'fail', message: 'Tour not found 😫' });
  }
};
// Delete a Tour /////////////////////////////////////
const deleteTour = (req, res) => {
  const requestedTour = tours.find(
    (tour) => tour.id === parseInt(req.params.id)
  );

  if (requestedTour) {
    res.status(204).json({
      // sending the data in JSEND format/specification
      status: 'success',
      data: {
        message: null,
      },
    });
  } else {
    res.status(404).json({ status: 'fail', message: 'Tour not found 😫' });
  }
};

// Tours Routes ////////////////////////////////////////////
app.route('/api/v1/tours').get(getAllTours).post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .delete(deleteTour)
  .patch(updateTour);

// Users Handlers /////////////////////////
// Get All Users /////////////////////////////////////
const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined yet 😩',
  });
};
// Get A User /////////////////////////////////////
const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined yet 😩',
  });
};
// Create a New User /////////////////////////////////////
const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined yet 😩',
  });
};
// Update a User /////////////////////////////////////
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined yet 😩',
  });
};
// Delete a Tour /////////////////////////////////////
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined yet 😩',
  });
};
// Users Routes/////////////////////////
app.route('/api/v1/users').get(getAllUsers).post(createUser);
app
  .route('/api/v1/users/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started listening on port ${PORT} 😎🤟`);
});
