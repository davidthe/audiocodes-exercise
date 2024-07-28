const express = require('express');
const { reportHealthIssue } = require('../controllers/reportController.js');
const router = express.Router();

router.post('/issue', reportHealthIssue);

module.exports = router;
