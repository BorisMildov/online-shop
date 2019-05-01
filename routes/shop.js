// what the users see
const path = require('path');

const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) =>{ //__dirname  global variable which simply holds the absolute path on our operating system 
    res.sendFile(path.join(__dirname,'../', 'views', 'shop.html'))// path.join path join will automatically build the path in a way that works 
    // a Send allows us to send a response and actually this allows us to attach a body
// this is another feature provided by express here.
});

module.exports = router;