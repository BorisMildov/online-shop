// the route that handle the creation of products witch the admin of the shop can do
const path = require('path');

const express = require('express');

const adminController = require('../controller/admin')

const router = express.Router(); // This router is like a mini express app. We can export here, so here 
                                //I can use module exports
// vmesto app pishem router
router.get('/add-product', adminController.getAddProduct);

router.get('/products', adminController.getProducts);

router.post('/add-product', adminController.postAddProduct);

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product', adminController.postEditProduct);

router.post('/delete-product', adminController.postDeleteProduct);

 exports.routes = router; 
// kogato pishem exports.routes tova che mojem da exportvame tochno opradelen obekt; suotveno mojem da go
// napravim za nqkolko
