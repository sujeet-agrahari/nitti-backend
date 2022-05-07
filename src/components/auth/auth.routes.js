module.exports = ({ router, AuthController, AuthValidator, makeValidatorCallback, makeExpressCallback }) => {
  router.post('/login', makeValidatorCallback(AuthValidator.validateLogin), makeExpressCallback(AuthController.login));
  return router;
};
