const crypto = require('crypto');
const algorithm = 'aes-256-cbc';

module.exports = {
  encrypt: function (text, key, ivString) {
    let cipher = crypto.createCipheriv(
      'aes-256-cbc',
      Buffer.from(key),
      ivString,
    );
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString('hex');
  },

  decrypt: function (text, key, ivString) {
    let iv = Buffer.from(ivString, 'hex');
    let encryptedText = Buffer.from(text, 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  },
};

// function encrypt(text, key, iv) {
//   let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
//   let encrypted = cipher.update(text);
//   encrypted = Buffer.concat([encrypted, cipher.final()]);
//   return encrypted.toString('hex');
// }

// function decrypt(text, key, ivString) {
//   let iv = Buffer.from(ivString, 'hex');
//   let encryptedText = Buffer.from(text, 'hex');
//   let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
//   let decrypted = decipher.update(encryptedText);
//   decrypted = Buffer.concat([decrypted, decipher.final()]);
//   return decrypted.toString();
// }

// const ivhex = crypto.randomBytes(16).toString('hex');
// const keyhex = crypto.randomBytes(32).toString('hex');
// const iv = Buffer.from(ivhex, 'hex');
// const key = Buffer.from(keyhex, 'hex');
// var hw = encrypt('Some serious stuff', key, iv);
// console.log(decrypt(hw, key, iv));
