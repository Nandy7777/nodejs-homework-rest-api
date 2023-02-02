const express = require('express');
const { tryCatchWrapper } = require('../../helpers/index');
const { current } = require('../../controllers/user/user');
const { auth } = require('../../middlewares/index');
const userRouter = express.Router();

userRouter.get('/current', tryCatchWrapper(auth), tryCatchWrapper(current));

module.exports = userRouter;
