const express = require('express');

const router = express.Router();
const UsersController = require('../controller/users');

module.exports = router;
const login = require('../middleware/login');

router.post('/login', UsersController.login);
router.post('/register', UsersController.register);

router.get('/', UsersController.getAll);
router.get('/:id', UsersController.getById);
router.put('/:id', login.mandatory, UsersController.update);
router.delete('/:id', login.mandatory, UsersController.removeById);
