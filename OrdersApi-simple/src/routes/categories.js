const express = require('express');

const router = express.Router();
const login = require('../middleware/login');

const CategoriesController = require('../controller/categories');

router.get('/', login.optional, CategoriesController.getAll);
router.post('/', login.mandatory, CategoriesController.create);
module.exports = router;
