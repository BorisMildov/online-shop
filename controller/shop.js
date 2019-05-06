const Product = require('../models/product')

exports.getProducts = (req, res, next) =>{ //__dirname  global variable which simply holds the absolute path on our operating system 
    Product.fetchAll((products) =>{
        res.render('shop/product-list', {
            prods: products, 
            pageTitle: 'All Products',
            path: '/products',
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
            }); // tezu obekti mojem da gi izpolzvame v HTML-a
        // path go izpozvame za active v html; hasProducts go izpolzvame zashtoto hbs ne chete celi izrazi i za tova ni trqbva promenvliva
    });
};

exports.getIndex = (req, res, next) => {
    Product.fetchAll((products) =>{
    res.render('shop/index', {
        prods: products, 
        pageTitle: 'Shop',
        path: '/'
        }); 
    });
}

exports.getCart = (req, res, next) => {   
    res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart'
    });
}

exports.getOrders = (req, res, next) => {   
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders'
    });
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Chechout'
    });
}