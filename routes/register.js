const express = require('express');
const {register} = require('../controllers/registerController');
const {registerWithAuth2} = require('../controllers/auth2Controller');

const router = express.Router();

router.post('/api/register', register);
router.post('/api/register-auth2', registerWithAuth2)

module.exports = router;