const fs = require("fs/promises");
const path = require('path');
const { User } = require('../../models/user');

async function uploadImage(req, res, next) {
  // const { filename } = req.file;
  // const tmpPath = path.resolve(__dirname, '../../tmp', filename);
  // const publicPath = path.resolve(__dirname, '../../public/avatars', filename);

  // try {
  //     await fs.rename(tmpPath, publicPath);
  // } catch (error) {
  //     await fs.unlink(tmpPath);
  //     throw error
  // }

  // const userId = req.params.id;

  // const avatarPath = `/public/${filename}`;
  // const user = await User.findByIdAndUpdate(userId, { avatarURL });
  // user.avatar = avatarPath;
  // await user.save();

  return res.json({
    data: {
      status: 'ok',
    },
  });
};

module.exports = uploadImage;
