const jwt = require("jsonwebtoken");

const config = process.env;

const tokenVerification = (req, res, next) => {
  const token = req.query.token || req.headers["x-access-token"] || req.headers["authorization"].split(" ")[1];
  if (!token) {
    return res.status(403).send("UnAuthorized: A token is required!");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = tokenVerification;