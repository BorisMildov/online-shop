const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controller/error')
const User = require('./models/user');

const app = express(); // the express package seems to export a function in the end.. so a lot of logic is in the
// app constant here
app.set('view engine', 'ejs');
app.set('views', 'views');   

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({extended: false})); // I want to parce the incomming request body; t.e da vzimam informaciqta ot formite
app.use(express.static(path.join(__dirname, 'public'))) //grant access to public folder for CSS

app.use((req, res, next) => {
    User.findById('5ce4236640a4a20310281345')
    .then(user => {
        req.user = user // t.e zakachame na reqesta user t.e promenliva user koqto da e ravna na usera s id-to pogore?
        next();
    })
})

app.use('/admin', adminRoutes.routes); //the exporting file. the order matters so if we put this middleware below, we will never reach that
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404)

mongoose.connect('mongodb://localhost:27017/shopsystem')
    .then(result => {
        User.findOne()
        .then(user => { // za vseki request (ili zarejdane na stranica) shte mi bude suzdavan user
            if(!user){
                const user = new User({
                name: 'bobito',
                email: 'boko@abv.bg',
                cart: {
                    items: []
                }
        });
        user.save();
            }
        })
        
        app.listen(3000);
    })
    .catch(err => {
        console.log(err)
})
