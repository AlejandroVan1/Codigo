const express = require('express');
const loginController = require('../controllers/loginController');

const router = express.Router();

router.post('/api/login', loginController.login);

module.exports = router;