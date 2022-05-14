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

const deductPercentValue = (amount, percent = 0) => amount * (1 - percent / 100);

const addPercentValue = (amount, percent = 0) => amount * (1 + percent / 100);

module.exports = { getIdParam, generatePassword, deductPercentValue, addPercentValue };
