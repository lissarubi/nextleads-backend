const connection = require('../database/connection');
const crypto = require('crypto');
const multiCrypto = require('multi-crypto');
const bcrypt = require('../utils/bcrypt');

module.exports = {
  async create(request, response) {
    const { name, username, password, image } = request.body;

    const loginid = crypto.randomBytes(16).toString('HEX');

    const encryptedPassword = await bcrypt.encrypt(password);

    await connection('users').insert({
      loginid,
      name,
      username,
      password: encryptedPassword,
      image,
    });

    return response.json();
  },
  async index(request, response) {
    const users = await connection('users').select(
      'loginid',
      'name',
      'username',
      'image',
    );

    return response.json({ users });
  },
};
