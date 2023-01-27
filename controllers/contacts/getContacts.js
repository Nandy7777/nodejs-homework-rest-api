const { Contact } = require('../../models/contact-schema');

const getContacts = async (req, res, next) => {
  const { limit = 20, page = 1 } = req.query;
  const skip = (page - 1) * limit;

  const contacts = await Contact.find({}).skip(skip).limit(limit);
  console.log('contacts:', contacts);
  res.status(200).json(contacts);
};

module.exports = getContacts;
