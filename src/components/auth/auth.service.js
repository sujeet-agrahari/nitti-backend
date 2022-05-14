const bcrypt = require('bcryptjs');
const { User, Student } = require('../../db/models');
const { generateJWT, verifyJWT } = require('./jwt.service');
const { BadRequestError, NotFoundError } = require('../../utils/api-errors');

const AuthService = {
  /**
   * Login a user and generate token.
   * @async
   * @method
   * @param {UserDto} requestBody - Request Body
   * @throws {NotFoundError} When the user is not found.
   */
  doLogin: async (requestBody) => {
    const { phone, password } = requestBody;
    const user = await User.findOne({
      where: {
        phone
      },
      include: Student
    });
    if (!user) {
      throw new NotFoundError('User not found');
    }
    const isValidPass = bcrypt.compareSync(password, user.password);
    if (!isValidPass) {
      throw new BadRequestError('Username or Password is invalid!');
    }

    const payload = user.toJSON();

    const accessToken = await generateJWT({
      ...payload,
      type: 'access'
    });
    const refreshToken = await generateJWT({
      ...payload,
      type: 'refresh'
    });
    return {
      accessToken,
      refreshToken,
      ...payload
    };
  },
  /**
   * Refresh a access token.
   * @async
   * @method
   * @param {UserDto} requestBody - Request Body
   * @returns {{ accessToken: String }} authToken
   */
  doRefreshToken: async (requestBody) => {
    const { refreshToken } = requestBody;
    const { userId, role } = await verifyJWT(refreshToken);
    const accessToken = await generateJWT({ userId, role, type: 'access' });
    return {
      accessToken
    };
  }
};

module.exports = AuthService;
