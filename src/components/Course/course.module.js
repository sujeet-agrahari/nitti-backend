const router = require('express').Router();

const { makeExpressCallback, makeValidatorCallback } = require('../../middlewares');

// validator
const CourseValidator = require('./course.validator');

// service
const CourseService = require('./course.service');

// controller
const controller = require('./course.controller');

const createCourse = controller.createCourse({ CourseService });
const updateCourse = controller.updateCourse({ CourseService });

const CourseController = { createCourse, updateCourse };

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
