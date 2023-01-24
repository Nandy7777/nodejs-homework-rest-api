const { User } = require('../../models/user');
const { Conflict } = require('http-errors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function createContact(req, res, next) {
    return res.status(201).json({
        ok: true,
    });
}

async function getContacts(req, res, next) {
    const { user } = req;
    const { contacts } = user;


    return res.status(200).json({
        data: {
            contacts,
        }
    });
}

async function current(req, res, next) {
  const { user } = req;
  const { email, subscription } = user;

  return res.status(200).json({
    data: {
      user: {
        email,
        subscription,
      },
    },
  });
}

module.exports = {
  createContact,
  getContacts,
  current,
};