const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const options = {
  errors: {
    wrap: {
      label: ''
    }
  }
};

const validateEnrollmentCreate = (httpRequest) => {
  const schema = Joi.object({
    studentId: Joi.string().guid({ version: 'uuidv4' }).required(),
    courseId: Joi.string().guid({ version: 'uuidv4' }).required(),
    netFees: Joi.number().integer().positive().strict().required(),
    discount: Joi.number().integer().min(0).default(0),
    enrolledOn: Joi.date()
  });
  return schema.validate(httpRequest.body, options);
};

module.exports = {
  validateEnrollmentCreate
};
