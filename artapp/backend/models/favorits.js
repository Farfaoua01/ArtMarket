const mongoose = require("mongoose");

const favorits = new mongoose.Schema({
    userid: {
        type: String
    },
    artworks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'artwork'
    }],
    creationDate: { type: Date, default: Date.now }
})
const favoritsModel = mongoose.model("favoritsModel", favorits);
module.exports = favoritsModel;