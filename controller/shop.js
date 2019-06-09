const Product = require('../models/product');
const Order = require('../models/order');

exports.getProducts = (req, res, next) => { //__dirname  global variable which simply holds the absolute path on our operating system 
    Product.find()
        .then(products => {
            // console.log(products)
            res.render('shop/product-list', {
                prods: products,
                pageTitle: 'All Products',
                path: '/products',
                hasProducts: products.length > 0,
                activeShop: true,
                productCSS: true
            });
        });
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(product => {
            res.render('shop/product-detail', {
                product: product,
                pageTitle: product.title,
                path: '/products'
            });
        })
        .catch(err => {
            console.log(err)
        })
};

exports.getIndex = (req, res, next) => {
    Product.find()
        .then(products => {
            //  console.log(products)
            res.render('shop/index', {
                prods: products,
                pageTitle: 'Shop',
                path: '/'
            });
        })
}

exports.getCart = (req, res, next) => {
    req.user
        .populate('cart.items.productId') // referirame specialno kum cart i vzimame cqlata info
        .execPopulate() // execPopulate go izpolzvame zashtoto sled populate ne mojem da imame then; samo taka mojem da imame promise
        .then(user => {
            const products = user.cart.items
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: products
            });
        })
        .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
        .then(product => {
            return req.user.addToCart(product)
        })
        .then(result => {
            //  console.log(result)
            res.redirect('/cart')
        });
};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user
        .removeFromCart(prodId)
        .then(result => {
            res.redirect('/cart')
        })
        .catch(err => { console.log(err) })
}

exports.postOrder = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            const products = user.cart.items.map(i => { // zashto go mapvame..???
                return { quantity: i.quantity, product: {...i.productId._doc } }; //from mongoose to access the all data in product.. not just the ID
            });
            //console.log(products)                                      // we pull out all the data in that doc(ument) we retrive and store in new object
            const order = new Order({
                products: products,
                user: {
                    name: req.user.name,
                    userId: req.user // taka e dostatuchno
                }
            });
            return order.save();
        })
        .then(result => {
            return req.user.clearCart();
        })
        .then(() => {
            res.redirect('/orders')
        })
        .catch(err => console.log(err));
}

exports.getOrders = (req, res, next) => {
    Order.find({ 'user: name': req.name }) // zashto go pishem tova i s id-to syshto ?
        .then(orders => {
            console.log(orders)
            res.render('shop/orders', {
                path: '/orders',
                pageTitle: 'Your Orders',
                orders: orders
            });
        })
        .catch(err => console.log(err));
};