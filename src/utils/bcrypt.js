const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
  encrypt: async function (data) {
    const result = bcrypt.hash(data, saltRounds).then(function (hash) {
      return hash;
    });

    return result;
  },

  compare: async function (input, hash) {
    const result = bcrypt.compare(input, hash).then(function (result) {
      return result;
    });
    return result;
  },
};
