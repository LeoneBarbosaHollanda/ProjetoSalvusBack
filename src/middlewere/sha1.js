//sha1js

const crypto = require("crypto");

/**
 * Create a sha1 from a string.
 *
 * @param {String} data String to be hashed.
 */
module.exports = (data) => {
  const generator = crypto.createHash("sha1");
  generator.update(data);
  return generator.digest("hex");
};
