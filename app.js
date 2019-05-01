const express = require('express');
const bodyParser = require('body-parser');

const app = express(); // the express package seems to export a function in the end.. so a lot of logic is in the
// app constant here
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop');
console.log("test git");
console.log();
app.use(bodyParser.urlencoded({extended: false})); // I want to parce the incomming request body; t.e da vzimam informaciqta ot formite

app.use(adminRoutes); //the exporting file. the order matters so if we put this middleware below, we will never reach that
app.use(shopRoutes);

app.listen(3000);