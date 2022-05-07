const router = require('express').Router();

const { makeExpressCallback, makeValidatorCallback } = require('../../middlewares');

// validator
const FeesValidator = require('./fees.validator');

// service
const FeesService = require('./fees.service');

// controller
const controller = require('./fees.controller');

const createFees = controller.createFees({ FeesService });

const FeesController = { createFees };

// routes
const routes = require('./fees.routes')({
  router,
  FeesController,
  FeesValidator,
  makeValidatorCallback,
  makeExpressCallback
});

module.exports = {
  FeesController,
  FeesService,
  FeesRoutes: routes
};
