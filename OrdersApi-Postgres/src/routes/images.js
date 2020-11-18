const express = require('express');

const router = express.Router();
const login = require('../middleware/login');

const ImagesController = require('../controller/images');

router.delete('/:id', login.mandatory, ImagesController.delete);

module.exports = router;
