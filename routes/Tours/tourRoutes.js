'use strict';
const express = require('express');
const tourControllers = require('../../controllers/Tours/tourControllers');

const {
  getAllTours,
  createTour,
  getTour,
  deleteTour,
  updateTour,
  checkId,
  checkBody,
} = tourControllers;

const router = express.Router();

// Middleware - catch the parameter that was passed in the url request
router.param('id', checkId);

router.route('/').get(getAllTours).post(checkBody, createTour);

router.route('/:id').get(getTour).delete(deleteTour).patch(updateTour);

module.exports = router;
