const express = require('express');

const register = require('../../controllers/auth/regisrer');
const login = require('../../controllers/auth/login');
const logout = require('../../controllers/auth/logout');
const { tryCatchWrapper } = require('../../helpers/index');
const { auth, upload } = require('../../middlewares/index');
const uploadAvatar = require('../../controllers/auth/uploadImg');

const authRouter = express.Router();

authRouter.post('/users/register', tryCatchWrapper(register));
authRouter.get('/users/login', tryCatchWrapper(login));
authRouter.post('/users/logout', tryCatchWrapper(auth), tryCatchWrapper(logout));
authRouter.patch(
  '/users/avatars',
  tryCatchWrapper(auth),
  upload.single('avatar'),
  tryCatchWrapper(uploadAvatar)
);

module.exports =  authRouter ;
