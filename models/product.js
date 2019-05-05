const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
); // data folder where I store my 'products.json' in JSON format

const getProductsFromFile = (cb) =>{
    
    fs.readFile(p, (err,fileContent) =>{
        if (err) {
           return cb([]);
        }else{
            cb(JSON.parse(fileContent))
        }
    })
};

module.exports = class Product{
    constructor(t) {
        this.title = t
    }

    save(){ // its a method available in this class

        getProductsFromFile(products => {
            products.push(this); 
            fs.writeFile(p, JSON.stringify(products), err => {
                console.log(err);
            });
        });
    }; 

    static fetchAll(cb) { //static makes sure that I can call this method directly on the class itself
        getProductsFromFile(cb)
    }
}