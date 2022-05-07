const AuthController = {
  login:
    ({ AuthService }) =>
    async (httpRequest) => {
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
