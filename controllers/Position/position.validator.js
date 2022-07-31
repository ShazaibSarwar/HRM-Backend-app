const Joi = require('joi')

exports.PositionValidation = Joi.object().keys({
    PositionName: Joi.string()
      .max(200)
      .required(),
    CompanyID: Joi.required()
  });