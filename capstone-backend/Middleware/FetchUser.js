const jwt = require('jsonwebtoken');
const JWT_SECRET = '!@!*VDE(#($JD(#';
const fetchuser = (req, res, next) => {
    //Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ error: 'Token1 not valid' });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    }
    catch {
        return res.status(401).send({ error: 'Token not valid' });
    }
}
module.exports = fetchuser;