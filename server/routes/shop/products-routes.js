const express = require('express');
const {
  getFileteredProducts,
  getProductDetails,
} = require('../../controllers/shop/products-controller');

const router = express.Router();

router.get('/get', getFileteredProducts);
router.get('/get/:id', getProductDetails);

module.exports = router;
