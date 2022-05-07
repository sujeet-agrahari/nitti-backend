const router = require('express').Router();

const { makeExpressCallback, makeValidatorCallback } = require('../../middlewares');

// validator
const CourseValidator = require('./course.validator');

// service
const CourseService = require('./course.service');

// controller
const CourseController = require('./course.controller');

// routes
const routes = require('./course.routes')({
  router,
  CourseController,
  CourseValidator,
  makeValidatorCallback,
  makeExpressCallback
});

module.exports = {
  CourseController,
  CourseService,
  CourseRoutes: routes
};
