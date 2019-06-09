const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cart: {
        items: [
            {
                productId: { type: Schema.Types.ObjectId, ref: 'Product', require: true }, // idto referira kum product
                // v productId shte imame informaciqta za produkta, t.e v cart ejs shte trqbva da loop-vame prez p.productId.title naprimer
                quantity: { type: Number, require: true }
            }
        ]
    }
});

userSchema.methods.addToCart = function (product) { // s methods si suzdavame nashi funkcii
    const cartProductIndex = this.cart.items.findIndex(cp => { // this ref kum shemata; cp => cart product..
        return cp.productId.toString() === product._id.toString()//(moje da ima bug !!!) 
        // produkta koito e dobaven v kolichkata 
        //da e raven na tozi koito tursim v bazata
    });
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
        //        this.cart.items[cartProductIndex].quantity++;
        //updatedCartItems[cartProductIndex].quantity = newQuantity; ili = na this.cart.items[cartProductIndex].quantity
        newQuantity = this.cart.items[cartProductIndex].quantity + 1;
        updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
        updatedCartItems.push({
            productId: product._id,
            quantity: newQuantity
        });
    }
    // const updatedCart = {
    //     items: updatedCartItems
    // };
    this.cart.items = updatedCartItems
    // this.cart = updatedCart;

    return this.save();
}
userSchema.methods.removeFromCart = function (productId) {
    const updatedCartItems = this.cart.items.filter(item => {
        return item.productId.toString() !== productId.toString();
    });
    this.cart.items = updatedCartItems;
    return this.save();
}
userSchema.methods.clearCart = function () {
    this.cart = { items: [] };
    return this.save();
}

//    let quantitY = 1;

// if (this.cart.items.productId === product._id) { // ne vliza v if-a; s toString() ne raboti pak
//     this.cart.items.quantity++
// }else{
//     this.cart.items.push({productId: product._id, quantity: quantitY});
// }
// return this.save();


module.exports = mongoose.model('User', userSchema);