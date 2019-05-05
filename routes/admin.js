// the route that handle the creation of products witch the admin of the shop can do
const path = require('path');

const express = require('express');

const productController = require('../controller/products')

const router = express.Router(); // This router is like a mini express app. We can export here, so here 
                                //I can use module exports
// vmesto app pishem router
// /admin/add-product => GET
router.get('/add-product', productController.getAddProduct);

// /admin/add-product => POST
router.post('/add-product', productController.postAddProduct);

//module.exports = router;
exports.routes = router; // creading routes objects i gi vikame v app-a
