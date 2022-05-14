const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const options = {
  errors: {
    wrap: {
      label: ''
    }
  }
};

const validateFeesCreate = (httpRequest) => {
  const schema = Joi.object({
    enrollmentId: Joi.string().guid({ version: 'uuidv4' }).required(),
    paidFees: Joi.number().integer().positive().strict().required(),
    paidOn: Joi.date(),
    medium: Joi.string().default('Cash'),
    receiptNo: Joi.string()
  });
  return schema.validate(httpRequest.body, options);
};

module.exports = {
  validateFeesCreate
};
