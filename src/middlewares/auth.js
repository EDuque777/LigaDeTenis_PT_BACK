const jwt = require('jsonwebtoken');
require("dotenv").config()
const { JWT_SECRET } = process.env

const isAuthenticated = (req, res, next) => {
    const token = req.cookies.token
    // console.log(token);
    if (!token) {
      res.status(401).send("You must be logged in to use this route")
    } else {
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
              res.status(403).send("There was a mistake")
            } else {
                if (user.role === 'admin') {
                  next();
                }else {
                  res.status(403).json("Access denied");
                }
            }
})
}
}
module.exports = { isAuthenticated }