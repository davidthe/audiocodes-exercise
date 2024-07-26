const express = require('express');
const { getUsers, getUserDetails } = require('../controllers/dataController');
const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', getUserDetails);

module.exports = router;
