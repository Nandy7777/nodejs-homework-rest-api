const bcrypt = require('bcrypt');
const { Conflict } = require('http-errors');
const gravatar = require('gravatar');

const { User } = require('../../models/user');
async function register(req, res, next) {
    const { email, password } = req.body;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

  try { 
    const avatarURL = gravatar.url(email);
    const savedUser = await User.create({
      email,
      password: hashedPassword,
      avatarURL,
    });
      
      
    res.status(201).json({
      data: {
        user: {
          email,
          subscription: savedUser.subscription,
        },
      },
    });

    } catch(error){
        console.log('error while saving user', error.name, error.message)
        if (error.message.includes("E11000 duplicate key error")) {
            throw Conflict('Email in use!');
        }
        throw error;
    }
   
};
 
module.exports = register