// Middleware to verify JWT token
const jwt = require("jsonwebtoken");

const authentication = async function(req, res, next) {
  try {
    let token = req.headers["x-api-key"];

    if (!token) {return res.status(400).send({ status: false, message: "please enter token" });
    }

    jwt.verify(token, "sonupk", (error, decodeToken) => {
      if (error) {
        return res.status(400).send({ status: false, message: "token is not correct" });
      }
      req["decodeToken"] = decodeToken;
      next();
    });
  } catch (error) {return res.status(500).send({ status: false, message: `this is catch error ${error.message}` });
  }
};



module.exports = {authentication}