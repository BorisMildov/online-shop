// what the users see
const path = require('path');

const express = require('express');

const shopController = require('../controller/shop')

const router = express.Router(); // router allows us to split our routes across files elegantly, instead app.use

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/cart', shopController.getCart);

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

module.exports = router;