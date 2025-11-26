const mongoose = require('mongoose');
const artwork = require('../models/artwork');
const artworkModel = require('../models/artwork');
const cartModel = require('../models/artworkcart');
const favoritModel = require('../models/favorits');
const order = require('../models/order');
exports.addartwork = async(req, res) => {
    const data = req.body;
    const picture = req.files;
    console.log('fileseeees', picture);
    try {
        const artworkdata = new artworkModel({
            title: data.title,
            description: data.description,
            price: data.price,
            category: data.category,
            medium: '',
            stock: data.quantity,
            history: data.history,
            fileurl: picture.filename,
        });
        const artworksaved = await artworkdata.save();
        const file = `uploads/${artworksaved.fileurl}`;
        res.json({ file: file });

    } catch (error) {
        res.json(error);
    }
}
exports.addtocart = async(req, res) => {
    console.log('ggggggggggggggggggggggggggggggg');
    const data = req.body.data;
    console.log('dattta', data);
    try {
        const cartfinded = await cartModel.findOne({
            userId: data.userId
        });
        if (cartfinded) {
            const updatedCart = await cartModel.findOneAndUpdate({
                userId: data.userId,
                'artworks.artwork': { $ne: data.artworkid }
            }, {
                $push: { artworks: { artwork: data.artworkid, quantity: data.quantity } }
            }, { new: true });
            console.log('updattted', updatedCart);
        } else {
            const order = new cartModel({
                artworks: { artwork: data.artworkid },
                userId: data.userId,
                artworks: { quantity: data.quantity },
            });
            const saved = await order.save();
            console.log('savvved', saved);
        }
    } catch (e) {

    }
}
exports.getartwork = async(req, res) => {
    try {
        const artwork = await artworkModel.find();
        res.json({
            data: artwork
        });
    } catch (error) {
        res.json(error);
    }

}
exports.findartwork = async(req, res) => {
    const { id } = req.params;
    try {
        const artworkcart = await artworkModel.findOne({ _id: id });
        res.json({ artworkcart: artworkcart });
    } catch (error) {
        res.json(error);
    }
}
exports.addartworkcart = async(req, res) => {
    const data = req.body.getitems;
    const gottenitems = req.body.data;
    const array = [];
    if (data && data.length > 0) {
        try {
            data.map(async(item) => {
                const artworkcartdata = new cartModel({
                    artwork: item.artworkid,
                    userId: item.userId,
                });
                const saved = await artworkcartdata.save();
                console.log('item', item);
                array.push(saved);
                console.log('array', array);
            })
            res.json('saved');
        } catch (e) {
            console.log(e);
            res.status(400).json(e);
        }
    } else if (gottenitems) {
        try {
            const cartfinded = await cartModel.findOne({
                userId: gottenitems.userid
            });
            if (cartfinded) {
                const updatedCart = await cartModel.findOneAndUpdate({
                    userId: gottenitems.userid,
                    'artworks.artwork': { $ne: gottenitems.artworkid }
                }, {
                    $push: { artworks: { artwork: gottenitems.artworkid } }
                }, { new: true });
                console.log('updattted', updatedCart);
                /* const finded = await cartModel.findOne({
                    userId: gottenitems.userid
                }, {
                    artworks: { $elemMatch: { artwork: gottenitems.artworkid } }
                });
                console.log('findedd', finded);
                if (finded === 'null') {
                    const updatedCart = await cartModel.findOneAndUpdate({
                        userId: gottenitems.userid
                    }, {
                        $push: { artworks: { artwork: gottenitems.artworkid } }
                    }, { new: true });
                    console.log('updattted', updatedCart);
                } */

            } else {
                const order = new cartModel({
                    artworks: { artwork: gottenitems.artworkid },
                    userId: gottenitems.userid,
                });
                const saved = await order.save();
                console.log('savvved', saved);
            }
            /* const findedorder = await cartModel.findOneAndUpdate({
                userId: gottenitems.userid,
            }, {
                $addToSet: { artworks: { artwork: gottenitems.artworkid } }
            }, { new: true });
            if (findedorder) {
                console.log("findeed", findedorder);
            } else {
                const order = new cartModel({
                    artworks: { artwork: gottenitems.artworkid },
                    userId: gottenitems.userid,
                });
                const saved = await order.save();
                console.log('savvved', saved);
            } */
            res.json({ message: 'order save' });
        } catch (e) {
            res.status(400).json(e);
        }
    }
}
exports.artworkcartlists = async(req, res) => {
    try {
        const artworkscart = await cartModel.find();
        const artworklist = []
        for (const artwork of artworkscart) {
            const item = await artworkModel.findOne({ _id: artwork.artworks });
            artworklist.push(item);
        }
        res.json(artworklist);
    } catch (e) {
        res.status(400).json(e);
    }
}
exports.artworkdetails = async(req, res) => {
    const { artworkId } = req.params;
    try {
        const findedartwork = await artwork.findOne({ _id: artworkId });
        const param = artworkId ? {
            _id: { $ne: artworkId }
        } : {};
        const filteredArtworks = await artworkModel.find(param);
        res.json({ artwork: findedartwork, filteredArtworks: filteredArtworks });
    } catch (error) {
        res.json(error);
    }
}
exports.getviewcart = async(req, res) => {
    const tokenId = req.query.tokenId;
    const userid = new mongoose.Types.ObjectId(tokenId);
    try {
        const cart = await cartModel.findOne({ userId: userid });
        const artworkarray = [];
        const array = [];
        const cartartworks = cart.artworks;
        let totalprice = 0;
        const items = []
        if (cart) {
            for (const item of cartartworks) {
                array.push(item.artwork);
                const artworks = await artwork.findOne({ _id: item.artwork });
                if (artworks) {
                    artworkarray.push(artworks);
                    totalprice += artworks.price * item.quantity;
                    const data = {
                        id: artworks._id,
                        title: artworks.title,
                        category: artworks.category,
                        price: artworks.price,
                        fileurl: artworks.fileurl,
                        quantity: item.quantity
                    }
                    items.push(data);
                }
            }
        }
        res.json({ artworks: items, totalprice: totalprice, cartitems: items });
    } catch (error) {
        console.log(error);
        res.json(error);
    }
}
exports.gettotalprice = async(req, res) => {
    const token = req.query.token;
    const user = new mongoose.Types.ObjectId(token);
    const userId = user.toString();
    try {
        const orders = await cartModel.findOne({
            userId: userId,
        });
        const cartlength = orders.artworks.length;
        res.json({ cartlength: cartlength });
    } catch (error) {
        res.status(400).json(error);
    }
}
exports.updateQuantity = async(req, res) => {
    const { data } = req.body;
    const cartitem = await cartModel.findOneAndUpdate({ 'artworks.artwork': data.id }, { $set: { 'artworks.$.quantity': data.quantity } });
}
exports.addQuantity = async(req, res) => {
    const { data } = req.body;
    console.log('quantitty ', data);
    const cartitem = await cartModel.updateOne({ 'artworks.artwork': data.id }, { $set: { 'artworks.$.quantity': data.quantity } });
    console.log('quuanty', cartitem);

}
exports.removeQuantity = async(req, res) => {
    const { data } = req.body;
    console.log('quantitty ', data);
    const cartitem = await cartModel.updateOne({ 'artworks.artwork': data.id }, { $set: { 'artworks.$.quantity': data.quantity } });
    console.log('quuanty', cartitem);

}
exports.fetchitems = async(req, res) => {
    const { localitems } = req.body;
    try {
        const array = [];
        for (const item of localitems) {
            const artpeice = await artwork.findOne({ _id: item.artworkid });
            array.push(artpeice);
        }
        res.json({ array });
    } catch (e) {
        res.status(400).json(e);
    }
}
exports.getartworks = async(req, res) => {
    try {
        const artworks = await artworkModel.find();
        res.json({ data: artworks });
    } catch (error) {
        res.json(error);
    }
}
exports.getartworks = async(req, res) => {
    try {
        const artworks = await artworkModel.find();
        res.json({ artworks: artworks });
    } catch (error) {
        res.json(error);
    }
}
exports.admingetorders = async(req, res) => {
    try {
        const orders = await order.find();
        res.json({ orders: orders });
    } catch (error) {
        res.json(error);
    }
}
exports.getartworksorder = async(req, res) => {
    const order = req.query.order;
    console.log("getorders")
    const orderId = new mongoose.Types.ObjectId(order);
    const array = [];
    try {
        const order = await order.findOne({
            _id: orderId
        });
        console.log('order', order);
        for (const artwork of order.artworks) {
            const pieceart = await artworkModel.findOne({ _id: artwork });
            array.push(pieceart);
        }
        res.json({ artworks: array });
    } catch (e) { res.status(404).json(e); }

}
exports.getcart = async(req, res) => {
    const token = req.query.token;
    const user = new mongoose.Types.ObjectId(token);
    const userId = user.toString();
    try {
        const orders = await cartModel.findOne({
            userId: userId,
        });
        const cartlength = orders.artworks.length;
        const totalprice = 0;
        const array = [];
        const cartitems = [];
        let sum = 0;
        if (orders) {
            const artworks = orders.artworks;
            for (const item of artworks) {
                const findedartwork = await artworkModel.findOne({ _id: item.artwork });
                array.push(findedartwork);
                if (findedartwork) {
                    const data = {
                        id: findedartwork._id,
                        title: findedartwork.title,
                        category: findedartwork.category,
                        price: findedartwork.price,
                        fileurl: findedartwork.fileurl,
                        quantity: item.quantity
                    }
                    cartitems.push(data);
                    sum += findedartwork.price * data.quantity;
                }
            }
            res.json({ artworks: cartitems, cartitem: orders, totalprice: sum, cartlength: cartlength });
        } else {
            console.log('elllse')
        }
    } catch (e) {
        console.log(e);
        res.status(400).json(e);
    }
}
exports.removeartwork = async(req, res) => {
    const id = req.query.id;
    const userid = req.query.userid;
    console.log('iddddddd', id);
    const artworkid = new mongoose.Types.ObjectId(id);
    const user = new mongoose.Types.ObjectId(userid);
    try {
        const cartcollection = await cartModel.updateOne({ userId: user }, {
            $pull: { artworks: { artwork: artworkid } }
        });
        res.json({ message: ' hello' });
    } catch (e) {
        res.status(404).json(e);
    }

}
exports.fetchartworks = async(req, res) => {
    try {
        const artworks = await artworkModel.find({ category: 'Originals' });
        res.json({ artworks: artworks });
    } catch (e) {
        res.status(404).json(e);
    }

}
exports.addtofavorits = async(req, res) => {
    const artworkid = req.query.id;
    const userid = req.query.userid;
    const usern = new mongoose.Types.ObjectId(userid);
    try {
        const addfavorits = await favoritModel.findOneAndUpdate({
            userid: userid,
            artworks: { $ne: usern }
        }, {
            $push: { artworks: artworkid }
        }, { upsert: true, new: true });
        res.json({ message: 'favorit added' });
    } catch (e) {
        res.status(400).json();
    }
}
exports.retreivefavorits = async(req, res) => {
    const id = req.query.id;
    try {
        const favorits = await favoritModel.findOne({
            userid: id
        });
        const array = [];
        for (artworkitem of favorits.artworks) {
            const item = await artworkModel.findOne({ _id: artworkitem });
            array.push(item);
        }
        res.json({ favorits: array });
    } catch (e) {
        console.log('eerror', e);
        res.status(400).json({ e });
    }
}
exports.updateQuntity = async(req, res) => {
    const { data } = req.body;
    console.log('quantittyYYYY ', data);
    const cartitem = await cartModel.findOneAndUpdate({ 'artworks.artwork': data.id }, { $set: { 'artworks.$.quantity': data.quantity } });
    res.json({ quantity: cartitem.quantity });
}
exports.incrementq = async(req, res) => {
    const { data } = req.body;
    console.log('dattayyyyyyyyyyyyyyyyyyyyy', data);
    const cartitem = await cartModel.findOneAndUpdate({ 'artworks.artwork': data.artworkid }, { $set: { 'artworks.$.quantity': data.quantity } });
    console.log('afteeeeeeeeeeeeeer', cartitem);
    res.json({ message: 'updated' });
}