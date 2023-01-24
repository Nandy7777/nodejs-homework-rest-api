const { HttpError } = require('../helpers/index');
const { Unauthorized } = require('http-errors');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

function validateBody(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(HttpError(400, error.message));
    }
    return next();
  };
};

async function auth(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer") {
    throw Unauthorized('Not authorized3');
  }

  if (!token) {
    throw Unauthorized('Not authorized2');
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id);
    console.log('user', user)


    req.user = user;
  } catch (error) {
    if (error.name === "TokenExpiredError" || error.name === "JsonWebTokenError") {
      throw Unauthorized('Not authorized1');
    }
    throw error;
  }
  
  next();
};

module.exports = {
  validateBody,
  auth,
};
