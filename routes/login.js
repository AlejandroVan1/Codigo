const express = require('express');
const loginController = require('../controllers/loginController');
const { loginWithAuth2 } = require('../controllers/auth2LoginController');

const router = express.Router();

router.post('/api/login', loginController.login);
router.post('/api/login-auth2', loginWithAuth2);

module.exports = router;