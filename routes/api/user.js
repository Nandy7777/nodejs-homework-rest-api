const express = require('express');
const { tryCatchWrapper } = require('../../helpers/index');
const { current } = require('../../controllers/user/user');
const { uploadImage } = require('../../controllers/user/uploadImg');
const {  auth, upload } = require('../../middlewares/index');
const userRouter = express.Router();

userRouter.get('/current', tryCatchWrapper(auth), tryCatchWrapper(current));
userRouter.patch('/avatars', upload.single('avatar'), tryCatchWrapper(uploadImage));
module.exports = userRouter;
