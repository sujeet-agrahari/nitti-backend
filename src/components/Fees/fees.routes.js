module.exports = ({ router, FeesController, FeesValidator, makeValidatorCallback, makeExpressCallback }) => {
  router.post(
    '/',
    makeValidatorCallback(FeesValidator.validateFeesCreate),
    makeExpressCallback(FeesController.createFees)
  );

  return router;
};
