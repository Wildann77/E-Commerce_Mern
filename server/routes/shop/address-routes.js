const express = require('express');
const {
  fetchAllAddress,
  addAdress,
  editAddress,
  deleteAddress,
} = require('../../controllers/shop/adress-controller');

const router = express.Router();

router.post('/add', addAdress);
router.get('/get/:userId', fetchAllAddress);
router.delete('/delete/:userId/:addressId', deleteAddress);
router.put('/update/:userId/:addressId', editAddress);

module.exports = router;
