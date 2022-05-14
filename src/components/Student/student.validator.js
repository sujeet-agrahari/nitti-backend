const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));
const { generatePassword } = require('../../utils/helper');

const options = {
  errors: {
    wrap: {
      label: ''
    }
  }
};

const validateStudentCreate = (httpRequest) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string(),
    middleName: Joi.string(),
    fatherName: Joi.string().required(),
    motherName: Joi.string().required(),
    addressLine1: Joi.string().required(),
    addressLine2: Joi.string(),
    email: Joi.string().email(),
    dateOfBirth: Joi.date().format('YYYY-MM-DD').required(),

    courseId: Joi.string().guid({ version: 'uuidv4' }).required(),
    enrolledOn: Joi.date().default(new Date()),
    discount: Joi.number().integer().min(0).default(0),

    paidFees: Joi.number().integer().positive().strict().required(),
    paidOn: Joi.date(),
    medium: Joi.string().default('Cash'),
    receiptNo: Joi.string(),

    phone: Joi.string()
      .pattern(/^[6-9]\d{9}$/)
      .required()
      .messages({
        'string.pattern.base': 'Provide valid phone number!'
      }),
    password: Joi.string().min(8).max(20).alphanum().default(generatePassword()),
    photo: Joi.string()
  });
  return schema.validate(httpRequest.body, options);
};

module.exports = {
  validateStudentCreate
};
