const AuthService = require('./auth.service');

const AuthController = {
  /**
   * Handle logging in user.
   * @async
   * @method
   * @param {ExpressRequest} httpRequest
   * @returns {Promise.<ControllerResponse> }
   */
  login: async (httpRequest) => {
    const student = await AuthService.doLogin(httpRequest.body);
    return {
      statusCode: 200,
      body: {
        data: student
      }
    };
  }
};

module.exports = AuthController;

module.exports = AuthController;
