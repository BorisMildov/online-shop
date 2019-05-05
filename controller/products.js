const Product = require('../models/product')

exports.getAddProduct = (req, res, next) =>{
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
}; 

exports.postAddProduct = (req, res, next) =>{
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/')
};

exports.getProducts = (req, res, next) =>{ //__dirname  global variable which simply holds the absolute path on our operating system 
    Product.fetchAll((products) =>{
        res.render('shop', {
            prods: products, 
            pageTitle: 'Shop',
            path: '/',
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
            }); // tezu obekti mojem da gi izpolzvame v HTML-a
        // path go izpozvame za active v html; hasProducts go izpolzvame zashtoto hbs ne chete celi izrazi i za tova ni trqbva promenvliva
    });
};