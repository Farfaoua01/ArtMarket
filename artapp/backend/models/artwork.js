const mongoose = require('mongoose');
const artworkSchema = new mongoose.Schema({
    title: { type: String, require: true },
    description: { type: String, require: true },
    price: { type: Number, require: true },
    category: { type: String, require: true },
    history: { type: String, require: true },
    medium: { type: String, require: true },
    stock: { type: Number, require: true },
    fileurl: { type: Array, require: true },
    created_at: {
        type: Date,
        default: Date.now
    }
});
const artwork = mongoose.model('artworkcollection', artworkSchema);
module.exports = artwork;