const mongoose = require('mongoose');

const SaleSchema =  new mongoose.Schema({
    id_user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    products: [{
        id_product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
        quantity: {type: Number, required: true}
    }],
    total_price: {type: Number, required: true},
    sale_date: {type: Date, default: Date.now}
}, {timestamps: true});

module.exports = mongoose.model('Sale', SaleSchema);