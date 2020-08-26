const connection = require('../database/connection');
const bcrypt = require('../utils/bcrypt');

module.exports = {
  async create(request, response) {
    const { name, username, password } = request.body;

    const user = await connection('users')
      .where({ username: username })
      .select('username', 'password', 'loginid')
      .first();
    if (
      ((await !bcrypt.compare(username, user.username)) &&
        (await !bcrypt.compare(password, user.password))) ||
      !user
    ) {
      return response.status(400).json({ error: 'no user found' });
    }

    const userPost = {
      username,
      password,
      loginid: user.loginid,
    };
    return response.json(userPost);
  },
};
