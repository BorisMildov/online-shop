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
    res.sendFile(path.join(rootDir, 'views', 'add-product.html')) // a Send allows us to send a response and actually this allows us to attach a body
// this is another feature provided by express here. The send method by default here simply sets an html content type
});

// /admin/add-product => POST
router.post('/add-product', (req, res, next) =>{
    products.push({ title: req.body.title })
  //  console.log(products)
    res.redirect('/')
})

//module.exports = router;
exports.routes = router; // creading 2 routes objects i gi vikame v app-a
exports.products = products;