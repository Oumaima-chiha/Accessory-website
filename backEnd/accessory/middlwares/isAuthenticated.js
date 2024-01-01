const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = isAuthenticated = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    res.status(401).send("Not Authorized");

  }


  const token = authHeader.split(" ")[1];


  if (token === 'null') {
    res.status(401).send("No access token");

  }


  else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (!err) {
        req.userId = decoded.id;
        next();
      }
      if (err) {
        console.log(err);
        res.status(401).send(err);
      }
    });
  }

};
