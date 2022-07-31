const Joi = require('joi')

exports.LeaveApplicationValidation = Joi.object().keys({
    Leavetype: Joi.string()
      .max(100)
      .required(),
  
    FromDate: Joi.date().required(),
    ToDate: Joi.date().required(),
    Reasonforleave: Joi.string()
      .max(100)
      .required(),
    Status: Joi.number()
      .max(1)
      .required()
  });