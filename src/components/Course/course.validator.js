const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const options = {
  errors: {
    wrap: {
      label: ''
    }
  }
};

const validateCourseCreate = (httpRequest) => {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    duration: Joi.number().integer().positive().strict().required(),
    description: Joi.string(),
    price: Joi.number().integer().positive().strict().required(),
    discount: Joi.number().min(0).default(0),
    isActive: Joi.boolean().default(true)
  });
  return schema.validate(httpRequest.body, options);
};

const validateCourseUpdate = (httpRequest) => {
  const schema = Joi.object({
    name: Joi.string().min(2),
    duration: Joi.number().integer().positive().strict(),
    description: Joi.string(),
    price: Joi.number().integer().positive().strict(),
    discount: Joi.number().min(0).default(0),
    isActive: Joi.boolean()
  });
  return schema.validate(httpRequest.body, options);
};

module.exports = {
  validateCourseCreate,
  validateCourseUpdate
};
