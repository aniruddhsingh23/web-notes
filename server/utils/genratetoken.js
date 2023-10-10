const jwt = require("jsonwebtoken");

const genrateWebToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "5d",
  });
};

module.exports = genrateWebToken;
