const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express(); // the express package seems to export a function in the end.. so a lot of logic is in the
// app constant here
app.set('view engine', 'ejs');
app.set('views', 'views');   

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop');

const errorController = require('./controller/error')

app.use(bodyParser.urlencoded({extended: false})); // I want to parce the incomming request body; t.e da vzimam informaciqta ot formite
app.use(express.static(path.join(__dirname, 'public'))) //grant access to public folder for CSS

app.use('/admin', adminRoutes.routes); //the exporting file. the order matters so if we put this middleware below, we will never reach that
app.use(shopRoutes);

app.use(errorController.get404)

app.listen(3000);