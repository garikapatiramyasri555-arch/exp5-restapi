// Consistent response wrappers

const success = (data) => ({ success: true, data });

const failure = (message, code = 400) => ({
  success: false,
  error: message,
  code
});

module.exports = { success, failure };