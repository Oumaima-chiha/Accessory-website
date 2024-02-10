const express = require('express');
const router = express.Router();
const authController = require('../controller/backoffice/backofficeUser');
const { refreshTokenGuard } = require('../middlwares/authenticateBackoffice');

// Route to handle user sign up
router.post('/signup', authController.signup);

// Route to handle user sign in
router.post('/', authController.signIn);

// Route to handle token refresh
router.post('/refresh', refreshTokenGuard,authController.refreshTokens);

module.exports = router;
