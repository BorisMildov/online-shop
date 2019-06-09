const Product = require('../models/product')

exports.getAddProduct = (req, res, next) =>{
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    });
}; 

exports.postAddProduct = (req, res, next) =>{
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product({
        title: title, // 1viq title referira kum klucha ot modela, a 2riq title referira kum req.body title 
        price: price,
        description: description, 
        imageUrl: imageUrl,
        userId: req.user //this give access to user id...; NB!! zashto slagame id na vseki produkt koito e 
        // suzdanen ot admina.. t.e mu slagame negovoto id na produkta
    });
    product
    .save()
    .then(result => {
     //   console.log(result)
        res.redirect('/admin/products')
    }).catch(err =>{
        console.log(err)
    })
};

exports.getEditProduct = (req, res, next) =>{
    const editMode = req.query.edit; //.edit zakacha na URL-a edit koeto e kluch i dursji vinagi true/false stoinsoti
    // edit e klucha ot url-a ?edit=true, koito durji value true, t.e
               // shte imame zapisano TRUE v editMode, no ako ne go nameri shte imame undefined
               //i sled suzdavaneto na vseki produkt toi darji Id-to na admina..
    if (!editMode) {
       return res.redirect('/')
    }
    const prodId = req.params.productId;
    Product.findById(prodId)
    .then(product => {
        if(!product){
            return res.redirect('/') // tva ne e li bezsmisleno? shtoto ako nqmame produkt to togava kak shte mu cuknem edit..
        }
        res.render('admin/edit-product', { 
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        });
    })
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;

    Product.findById(prodId)
    .then(product => {
        product.title = updatedTitle;
        product.price = updatedPrice;
        product.description = updatedDescription;
        product.imageUrl = updatedImageUrl;
        return product.save();
    })
    .then(result => {
        console.log("Updated Product")
        res.redirect('/admin/products')
    })
    .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) =>{
    Product.find()
    // .select('title price -_id') // tuk select ni pokazva samo title i price na produkta; witch fields we retrive form DB
    // .populate('userId', 'name') // populate ni dava vazmojnost da vzemem vs inf ot obekta na usera..v sluchaq samo name; ako ostavim userid samo shte ni vurnne vsichko
        .then(products => {
           // console.log(products)
            res.render('admin/products', {
            prods: products, 
            pageTitle: 'Admin Products',
            path: '/admin/products'
            }); 
        });
};

exports.postDeleteProduct = (req, res, next) =>{
    const prodId = req.body.productId;
    Product.findByIdAndRemove(prodId)
    .then(() => {
        console.log("Deleted Product!!!")
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};