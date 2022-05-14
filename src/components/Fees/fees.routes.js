/**
 *
 * @param {Object} FeesRouter
 * @param {ExpressRouter} FeesRouter.router
 * @param {FeesController} FeesRouter.FeesController
 * @param {FeesValidator} FeesRouter.FeesValidator
 * @param {makeExpressCallback} FeesRouter.makeExpressCallback
 * @param {makeValidatorCallback} FeesRouter.makeValidatorCallback
 * @returns {ExpressRouter}
 */
module.exports = ({ router, FeesController, FeesValidator, makeValidatorCallback, makeExpressCallback }) => {
  router.post(
    '/',
    makeValidatorCallback(FeesValidator.validateFeesCreate),
    makeExpressCallback(FeesController.createFees)
  );

  router.get('/total', makeExpressCallback(FeesController.getTotalCollectedFees));
  router.get('/', makeExpressCallback(FeesController.getFees));

  return router;
};
