// what the users see
const path = require('path');

const express = require('express');

const shopController = require('../controller/shop')

const router = express.Router(); // router allows us to split our routes across files elegantly, instead app.use

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct); // we extract productId;

router.get('/cart', shopController.getCart);

router.post('/cart',shopController.postCart);

router.post('/cart-delete-item', shopController.postCartDeleteProduct)

router.post('/create-order', shopController.postOrder)

router.get('/orders', shopController.getOrders);



module.exports = router;