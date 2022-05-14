const { generatePassword } = require('../../utils/helper');

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
    phone: Joi.string()
      .pattern(/^[6-9]\d{9}$/)
      .required()
      .messages({
        'string.pattern.base': 'Provide valid phone number!'
      }),
    password: Joi.string().min(8).max(20).alphanum().default(generatePassword()),
    firstName: Joi.string().required(),
    middleName: Joi.string().empty(''),
    lastName: Joi.string().required(),
    fatherName: Joi.string().required(),
    motherName: Joi.string().required(),
    addressLine1: Joi.string().required(),
    addressLine2: Joi.string(),
    email: Joi.string().email(),
    dateOfBirth: Joi.date().required(),
    photo: Joi.string(),

    courseId: Joi.string().guid({ version: 'uuidv4' }).required(),
    totalFees: Joi.number().integer().positive().strict().required(),
    discount: Joi.number().integer().min(0).default(0),
    enrolledOn: Joi.date().default(new Date()),

    paidFees: Joi.number().integer().positive().strict().required(),
    paidOn: Joi.date(),
    medium: Joi.string().default('Cash'),
    receiptNo: Joi.string()
  });
  return schema.validate(httpRequest.body, options);
};

const validateEnrollmentUpdate = (httpRequest) => {
  const schema = Joi.object({
    phone: Joi.string()
      .pattern(/^[6-9]\d{9}$/)
      .messages({
        'string.pattern.base': 'Provide valid phone number!'
      }),
    password: Joi.string().min(8).max(20).alphanum().empty(''),
    firstName: Joi.string(),
    middleName: Joi.string().empty(''),
    lastName: Joi.string(),
    fatherName: Joi.string(),
    motherName: Joi.string(),
    addressLine1: Joi.string(),
    addressLine2: Joi.string(),
    email: Joi.string().email(),
    dateOfBirth: Joi.date(),
    photo: Joi.string(),

    courseId: Joi.string().guid({ version: 'uuidv4' }),
    totalFees: Joi.number().integer().positive().strict(),
    discount: Joi.number().integer().min(0),
    enrolledOn: Joi.date()
  });
  return schema.validate(httpRequest.body, options);
};
module.exports = {
  validateEnrollmentCreate,
  validateEnrollmentUpdate
};
