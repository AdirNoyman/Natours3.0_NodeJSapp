'use strict';
const express = require('express');
const userControllers = require('../../controllers/Users/userControllers');

const { getAllUsers, getUser, createUser, updateUser, deleteUser } =
  userControllers;

const router = express.Router();

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
