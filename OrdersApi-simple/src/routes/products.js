const express = require('express');

const router = express.Router();
const multer = require('multer');
const login = require('../middleware/login');
const ProductsController = require('../controller/products');

// _________________ UploadImg Properties_________________

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads/');
  },
  filename(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter,
});

// _________________ROUTES_________________

router.get('/', login.optional, ProductsController.getAll);

router.get('/:id', ProductsController.getById);

// eslint-disable-next-line prettier/prettier
router.post(
  '/',
  login.mandatory,
  upload.single('pdt_img'),
  ProductsController.create
);

router.put('/:id', login.mandatory, ProductsController.update);

router.delete('/:id', login.mandatory, ProductsController.delete);

module.exports = router;
