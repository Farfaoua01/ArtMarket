const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const nodemailer = require('nodemailer');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
exports.postRegister = async(req, res) => {
    const { firstname, lastname, email, password } = req.body;
    console.log("before");
    try {
        const hashedpassword = await bcrypt.hash(password, 10);
        const user = new userModel({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: hashedpassword,
            role: 'customer'
        });
        console.log("savvvvved", user);
        const userSaved = await user.save();
        res.json({ userSaved: userSaved });
    } catch (error) {
        res.status(400).json(error);
    }
}
exports.login = async(req, res) => {
    const logindata = req.body;
    console.log('before tokenn');
    const JWT_KEY = 'fhhhhooç_è555h';
    try {
        const user = await userModel.findOne({ email: logindata.email });
        if (!user || !(await bcrypt.compare(logindata.password, user.password))) {
            console.log('errrror');
            return res.status(400).json({ error: 'invalid credentials' });
        } else {
            const userdata = {
                    userid: user._id,
                    role: user.role,
                    email: user.email
                }
                //generate a jtoken
            console.log('elsee');
            const token = jwt.sign(userdata, JWT_KEY, { expiresIn: '1h' });
            return res.json({ data: token });
        }
    } catch (error) {
        return res.status(400).json({ error: error });
    }
}
exports.verifyToken = async(req, res) => {
    try {
        res.json({ message: 'verifiedd' });
    } catch (e) {
        console.log("catched error", e);
        res.json({ error: e });
    }
}
exports.getuserinfo = async(req, res) => {
    const userid = req.query.userid;
    try {
        const user = await userModel.findOne({ _id: userid });
        res.json({ user });
    } catch (e) {
        res.status(404).json(e);
    }
}
exports.userupdate = async(req, res) => {
    const id = req.query.token;
    const body = req.body.data;
    console.log('id', id);
    console.log('bodyyyyyy', body);
    try {
        const updated = await userModel.findOneAndUpdate({ _id: id }, {
            $set: {
                firstname: body.firstname,
                lastname: body.lastname,
                phone: body.phone,
            }
        });
        console.log('gggggggggggggggdtyd', updated);
        res.json({ message: 'updated' });
    } catch (e) {
        res.status(400).json({ message: e });
    }

}
exports.googlelogi = async(req, res) => {
    passport.authenticate('google', { scope: ['profile'] });
    res.send('POST request received');
    console.log('herre');
}
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'businessfa37@gmail.com',
        pass: 'jmnw rkqz ypuk mqon'
    }
});
exports.forgotpassword = async(req, res) => {
    const { email } = await req.body;
    const mailOptions = {
        from: 'businessfa37@gmail.com',
        to: email,
        subject: 'Password Reset Request',
        html: `<p>You have requested to reset your password. Click
        <a href="http://localhost:3000/reset-password">here</a> to reset your password.</p>`
    };
    console.log(mailOptions);
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).json({ message: 'Failed to send password reset email' });
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json({ message: 'Password reset email sent successfully' });
        }
    });
}