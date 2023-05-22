import api from "../tools/common";
import jwt from "jsonwebtoken";
import config from "../config/settings";
var salt = config.security.salt;
console.log(salt);
function authorization(req, res, next) {
  var token = req.headers["authorization"];
  var flag = true;
  if (token == null || token == "") {
    flag = false;
  }
  if (flag) {
    jwt.verify(token, salt, function (err, decoded) {
      // body...
      if (err) {
        api.error(res, "Token consistency error", "401");
      } else {
        console.log("im here");
        return next();
      }
    });
  } else {
    api.error(res, "Token not provided", "401");
  }
}

module.exports = {
  authorization,
};
