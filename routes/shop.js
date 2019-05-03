// what the users see
const path = require('path');

const express = require('express');

const router = express.Router(); // router allows us to split our routes across files elegantly, instead app.use
const adminData = require('./admin')

const rootDir = require('../util/path');

router.get('/', (req, res, next) =>{ //__dirname  global variable which simply holds the absolute path on our operating system 
    const products = adminData.products
    res.render('shop', {
        prods: products, pageTitle: 'Shop',
        pageTitle: 'Shop',
        path: '/',
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true
        }); // tezu obekti mojem da gi izpolzvame v HTML-a
    // path go izpozvame za active v html; hasProducts go izpolzvame zashtoto hbs ne chete celi izrazi i za tova ni trqbva promenvliva
});

module.exports = router;