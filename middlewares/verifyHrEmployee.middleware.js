const jwt = require('jsonwebtoken');
const jwtKey = process.env.JWTKEY;

module.exports = (req, res, next) => {
    
    const Header = req.headers["authorization"];
    if (typeof Header === "undefined") return res.sendStatus(403);

    // Verifying Authorization header with our private key
    jwt.verify(Header, jwtKey, (err, authData) => {
        if (err) return res.sendStatus(403); // Forbidden
        if (authData.Account == 2) {
            next();
        } else if (authData.Account == 3) {
            if (authData._id == req.params.id) return next();
            res.sendStatus(403); // Forbidden
        } else { 
            res.sendStatus(403); // Forbidden
        }
    });
}