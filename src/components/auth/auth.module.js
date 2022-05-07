const router = require('express').Router();

const { makeExpressCallback, makeValidatorCallback } = require('../../middlewares');

// validator
const AuthValidator = require('./auth.validator');

// service
const AuthService = require('./auth.service');

// controller
const controller = require('./auth.controller');

const login = controller.login({ AuthService });

const AuthController = { login };

// routes
const routes = require('./auth.routes')({
  router,
  AuthController,
  AuthValidator,
  makeValidatorCallback,
  makeExpressCallback
});

module.exports = {
  AuthController,
  AuthService,
  AuthRoutes: routes
};
