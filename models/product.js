const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
); // data folder where I store my 'products.json' in JSON format

const getProductsFromFile = (cb) =>{
    
    fs.readFile(p, (err, fileContent) =>{
        if (err) {
           return cb([]);
        }else{
            cb(JSON.parse(fileContent))
        }
    })
};

module.exports = class Product{
    constructor(title,imageUrl,description, price) {
        this.title = title,
        this.imageUrl = imageUrl,
        this.description = description,
        this.price = price
    }

    save(){ // its a method available for any obejct

        getProductsFromFile(products => {
            products.push(this); 
            fs.writeFile(p, JSON.stringify(products), err => {
                console.log(err);
            });
        });
    }; 

    static fetchAll(cb) { //static is available only for the Class itself
        getProductsFromFile(cb)
    }
}