const { User } = require('../../models/user');
const bcrypt = require('bcrypt');
const { Unauthorized } = require('http-errors');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

async function login(req, res, next) {
    const { email, password } = req.body;
    
    const storedUser = await User.findOne({
        email,
    });

    if (!storedUser) {
        throw Unauthorized('Email or password is wrong');
    }

    if (!storedUser.verify) {
      throw Unauthorized('Email is not verified. Please check your mail box');
    }

    const isPasswordValid = await bcrypt.compare(password, storedUser.password);

    if (!isPasswordValid) {
      throw Unauthorized('password is not valid');
    }

  const token = jwt.sign({ id: storedUser._id }, JWT_SECRET, {
      expiresIn: "1h",
  });
  await User.findByIdAndUpdate(storedUser._id, { token });

  res.json({
    token,
    user: {
      email,
      subscription: storedUser.subscription,
    },
  });
}

module.exports = login;
