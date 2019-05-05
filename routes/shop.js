// what the users see
const path = require('path');

const express = require('express');

const productsController = require('../controller/products')

const router = express.Router(); // router allows us to split our routes across files elegantly, instead app.use

router.get('/', productsController.getProducts);

module.exports = router;