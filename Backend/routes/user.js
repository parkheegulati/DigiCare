const express = require('express');
const router = express.Router();
const { getUserProfile } = require('../controllers/user');

router.post('/getProfile', getUserProfile);

module.exports = router;
