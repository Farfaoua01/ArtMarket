const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const artwork = require('../controllers/artworkController');
const verifyToken = require('../middlewares/verifyToken');
const multer = require('multer');
const passport = require('passport');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save files to the uploads directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = multer({ storage: storage });
router.get('/auth/google', userController.googlelogi);
router.post('/register', userController.postRegister);
router.post('/forgotpassword', userController.forgotpassword);
router.post('/login', userController.login);
router.post('/addartwork', upload.array('files'), artwork.addartwork);
router.get('/getartwork', artwork.getartwork);
router.get('/findartwork/:id', artwork.findartwork);
router.post('/addartworkcart', artwork.addartworkcart);
router.get('/artworkcartlists', artwork.artworkcartlists);
router.get('/artworkdetails/:artworkId', artwork.artworkdetails);
router.get('/viewcart', artwork.getviewcart);
router.get('/gettotalprice', artwork.gettotalprice);
router.put('/addQuantity', artwork.addQuantity);
router.put('/updateQuantity', artwork.updateQuantity);
router.put('/updateQuntity', artwork.updateQuntity);
router.get('/getcart', artwork.getcart);
router.post('/fetchitems', artwork.fetchitems);
router.get('/getartworks/:id', artwork.getartworks);
router.get('/getartworks', artwork.getartworks);
router.get('/admingetorders', artwork.admingetorders);
router.get('/account', verifyToken, userController.verifyToken);
router.get('/getuserinfo', userController.getuserinfo);
router.put('/userupdate', userController.userupdate);
router.get('/getartworksorder', artwork.getartworksorder);
router.get('/removeartwork', artwork.removeartwork);
router.get('/fetchartworks', artwork.fetchartworks);
router.get('/addToFatorits', artwork.addtofavorits);
router.get('/retreivefavorits', artwork.retreivefavorits);
router.put('/updateincrement', artwork.incrementq);
/*
router.post('/create-intent-payement', userController.createpayement); */
router.post('/addtocart', artwork.addtocart)
module.exports = router;