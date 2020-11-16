const express = require('express');

const router = express.Router();
const UsersController = require('../controller/users');

module.exports = router;

router.post('/register', UsersController.register);
router.post('/login', UsersController.login);
