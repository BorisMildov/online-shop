// what the users see
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) =>{
    res.send("<h1>Hello from ExpressJS</h1>") // a Send allows us to send a response and actually this allows us to attach a body
// this is another feature provided by express here. The send method by default here simply sets an html content type
});

module.exports = router;