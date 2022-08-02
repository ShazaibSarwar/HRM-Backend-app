const jwt = require('jsonwebtoken');
const jwtKey = process.env.JWTKEY;

module.exports = (req, res, next) => {
    
    const Header = req.headers["authorization"];

    if (typeof Header !== "undefined") {
        // decodedData = jwt.decode(req.headers['authorization']);
        // if(decodedData.Account)
        jwt.verify(Header, jwtKey, (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {
                
                if (authData.Account == 2) {
                    next();
                } else if (authData.Account == 3) {
                    if (authData._id == req.params.id) {
                        next();
                    }
                    else {
                        res.sendStatus(403);
                    }
                } else {
                    res.sendStatus(403);
                }
            }
        });
    } else {
        // Forbidden
        res.sendStatus(403);
    }
}