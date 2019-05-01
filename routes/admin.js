// the route that handle the creation of products witch the admin of the shop can do
const express = require('express');

const router = express.Router(); // This router is like a mini express app. We can export here, so here 
                                //I can use module exports
// vmesto app pishem router
router.get('/add-product', (req, res, next) =>{
    res.send('<form action= "/product" method="POST"><input type="text" name= "title"><button type= "sumbit">Add Product</button></form>') // a Send allows us to send a response and actually this allows us to attach a body
// this is another feature provided by express here. The send method by default here simply sets an html content type
});

router.post('/product', (req, res, next) =>{
    console.log(req.body)
    res.redirect('/')
})

module.exports = router;