const express = require('express');

const register = require('../../controllers/auth/regisrer');
const login = require('../../controllers/auth/login')
const { tryCatchWrapper } = require('../../helpers/index');

const authRouter = express.Router();

authRouter.post('/users/register', tryCatchWrapper(register));
authRouter.post('/users/login', tryCatchWrapper(login));

module.exports =  authRouter ;
