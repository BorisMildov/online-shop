// the route that handle the creation of products witch the admin of the shop can do
const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router(); // This router is like a mini express app. We can export here, so here 
                                //I can use module exports
const products = [];
// vmesto app pishem router
// /admin/add-product => GET
router.get('/add-product', (req, res, next) =>{
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
});

// /admin/add-product => POST
router.post('/add-product', (req, res, next) =>{
    products.push({ title: req.body.title });
   });
    res.redirect('/')
})

//module.exports = router;
exports.routes = router; // creading 2 routes objects i gi vikame v app-a
exports.products = products;