const Validator = require('fastest-validator');

const v = new Validator({
  messages: {
    // Register our new error message text
    phoneNumber: "The phone number must be started with '+'!"
  }
});

module.exports = v;
