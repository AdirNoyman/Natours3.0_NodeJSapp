const fs = require('fs');
// Read data and returning JS object instead of the json format
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../../dev-data/data/tours-simple.json`, 'utf8')
);

// Check if the requested tour Id exists
exports.checkId = (req, res, next, value) => {
  const requestedTour = tours.find(
    (tour) => tour.id === parseInt(req.params.id)
  );
  if (!requestedTour) {
    return res
      .status(404)
      .json({ status: 'fail', message: 'Tour not found 😫' });
  }

  next();
};

// Check if the requeste for creatTour contains data needed for creating the tour
exports.checkBody = (req, res, next) => {
  const { name, price } = req.body;
  if (!name || name.length < 3 || !price || price === 0) {
    return res.status(404).json({
      status: 'fail',
      message:
        'Invalid tour create request 🤨 ...please make sure you provided name and price data',
    });
  }

  next();
};

// Tours Handlers /////////////////////////
// Get All Tours /////////////////////////////////////
exports.getAllTours = (req, res) => {
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
exports.getTour = (req, res) => {
  const requestedTour = tours.find(
    (tour) => tour.id === parseInt(req.params.id)
  );
  res.status(200).json({
    // sending the data in JSEND format/specification
    status: 'success',
    data: {
      tour: requestedTour,
    },
  });
};
// Create a New Tour /////////////////////////////////////
exports.createTour = (req, res) => {
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
exports.updateTour = (req, res) => {
  res.status(200).json({
    // sending the data in JSEND format/specification
    status: 'success',
    data: {
      tour: '<updated tour....>',
    },
  });
};
// Delete a Tour /////////////////////////////////////
exports.deleteTour = (req, res) => {
  res.status(204).json({
    // sending the data in JSEND format/specification
    status: 'success',
    data: {
      message: null,
    },
  });
};
