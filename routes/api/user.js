const express = require('express');
const { tryCatchWrapper } = require('../../helpers/index');
const { createContact, getContacts, current } = require('../../controllers/user/user');
const {  auth } = require('../../middlewares/index');
const userRouter = express.Router();

userRouter.post('/', tryCatchWrapper(auth), tryCatchWrapper(createContact));

userRouter.get('/', tryCatchWrapper(auth), tryCatchWrapper(getContacts));

userRouter.get('/current', tryCatchWrapper(auth), tryCatchWrapper(current));

module.exports = userRouter;
