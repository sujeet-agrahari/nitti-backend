const router = require('express').Router();

const { makeExpressCallback, makeValidatorCallback } = require('../../middlewares');

// validator
const StudentValidator = require('./student.validator');

// service
const StudentService = require('./student.service');

// controller
const StudentController = require('./student.controller');

// routes
const routes = require('./student.routes')({
  router,
  StudentController,
  StudentValidator,
  makeValidatorCallback,
  makeExpressCallback
});

module.exports = {
  StudentController,
  StudentService,
  StudentRoutes: routes
};
