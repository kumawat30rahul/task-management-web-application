const jwt = require("jsonwebtoken");
const { createErrorResponse } = require("../utils/responseHandler");

const isAuth = (req, res, next) => {
  console.log("req.headers", req);
  const token = req.headers["access_token"];
  console.log("token", token);

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.AT_SCECRET_KEY, (err, decoded) => {
    if (err) {
      return res.send(
        createErrorResponse({
          statusCode: 401,
          message: "Unauthorized Access_token",
          status: "ERROR",
          error: err,
        })
      );
    }

    req.user = decoded;
    next();
  });
};

module.exports = isAuth;
