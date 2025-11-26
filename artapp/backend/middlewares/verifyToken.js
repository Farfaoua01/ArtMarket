const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
    const JWT_KEY = 'fhhhhooç_è555h';
    console.log("middlewarrrrrrrrrrrrz");
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log('token middleware', token);
    /* if (token === 'null') {
        console.log("null");
        return res.sendStatus(401)
    }; */
    jwt.verify(token, JWT_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        console.log("nexxt");
        next();
    })
}
module.exports = verifyToken;