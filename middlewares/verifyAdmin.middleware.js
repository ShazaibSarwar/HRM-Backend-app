const jwt = require('jsonwebtoken');
const jwtKey = process.env.JWTKEY;

module.exports = (req, res, next) => {
  
  const Header = req.headers["authorization"];

  if (typeof Header === "undefined") return res.sendStatus(403)  // Forbidden
  jwt.verify(Header, jwtKey, (err, authData) => {
    if (err) return res.sendStatus(403)
    
    if (authData.Account == 1) {
      next();
    } else {
      res.sendStatus(403);
    }

  });

}
