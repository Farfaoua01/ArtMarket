const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    artworks: [{
        artworkId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'artwork'
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'userModel'
        },
        quantity: { type: String },
    }],
    status: {
        type: String,
        enum: ['pending', 'completed', 'shipped', 'cancelled'],
        default: 'pending'
    },
    orderCreation: {
        type: Date,
        default: Date.now
    },
    shippingAddress: {
        type: String, // Simplified for this example

    },
    paymentDetails: {
        type: String, // Simplified for this example

    }
});
const order = mongoose.model("order", orderSchema);
module.exports = order;