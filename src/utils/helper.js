const getIdParam = (req) => {
  const { id } = req.params;
  if (/^\d+$/.test(id)) {
    return Number.parseInt(id, 10);
  }
  throw new TypeError(`Invalid ':id' param: "${id}"`);
};

const generatePassword = (length = 8) => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let password = '';
  for (let i = 0, n = charset.length; i < length; i += 1) {
    password += charset.charAt(Math.floor(Math.random() * n));
  }
  return password;
};

module.exports = { getIdParam, generatePassword };
