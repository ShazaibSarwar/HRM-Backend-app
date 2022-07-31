const Joi = require('joi')

exports.LeaveApplicationHRValidation = Joi.object().keys({
    Status: Joi.number()
      .max(3)
      .required()
  });