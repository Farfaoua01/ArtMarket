const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
    artworks: [{
        artwork: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'artwork'
        },
        quantity: { type: String, default: 1 },
    }],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel'
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    totalprice: { type: Number }
});
const cartModel = mongoose.model("artworkorder", cartSchema);
module.exports = cartModel;