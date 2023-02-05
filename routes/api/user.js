const express = require('express');
const { tryCatchWrapper } = require('../../helpers/index');
const { current, verifyEmail, resendVerifyEmail } = require('../../controllers/user/user');
const { auth } = require('../../middlewares/index');
const userRouter = express.Router();

userRouter.get('/current', tryCatchWrapper(auth), tryCatchWrapper(current));
userRouter.get('/verify/:verificationToken', tryCatchWrapper(verifyEmail));
userRouter.post('/verify', tryCatchWrapper(resendVerifyEmail));

module.exports = userRouter;
