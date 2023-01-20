const { HttpError } = require('../../helpers');
const { User } = require('../../models/user');
const bcrypt = require('bcrypt');

async function login(req, res, next) {
    const { email, password } = req.body;
    
    const storedUser = await User.findOne({
        email,
    });

    if (!storedUser) {
        throw new HttpError(401, 'Email or password is wrong');
    }

    const isPasswordValid = await bcrypt.compare(password, storedUser.password);

    if (!isPasswordValid) {
      throw new HttpError(401, 'password is not valid');
    }

  res.json({
    token: 'Token',
  });
}

module.exports = login;
