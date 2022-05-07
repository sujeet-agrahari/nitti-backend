const router = require('express').Router();

const { makeExpressCallback, makeValidatorCallback } = require('../../middlewares');

// validator
const EnrollmentValidator = require('./enrollment.validator');

// service
const EnrollmentService = require('./enrollment.service');

// controller
const EnrollmentController = require('./enrollment.controller');

// routes
const routes = require('./enrollment.routes')({
  router,
  EnrollmentController,
  EnrollmentValidator,
  makeValidatorCallback,
  makeExpressCallback
});

module.exports = {
  EnrollmentController,
  EnrollmentService,
  EnrollmentRoutes: routes
};
