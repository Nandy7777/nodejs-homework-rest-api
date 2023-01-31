const { HttpError } = require('../helpers/index');
const { Unauthorized } = require('http-errors');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const multer = require('multer');
const path = require('path');

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
    throw Unauthorized('Not authorized');
  }

  if (!token) {
    throw Unauthorized('Not authorized');
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id);
    console.log('user', user)

    req.user = user;
  } catch (error) {
    if (error.name === "TokenExpiredError" || error.name === "JsonWebTokenError") {
      throw Unauthorized('Not authorized');
    }
    throw error;
  }
  
  next();
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../tmp'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

module.exports = {
  validateBody,
  auth,
  upload,
};
