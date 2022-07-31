const Joi = require('joi')

exports.RoleValidation = Joi.object().keys({
    RoleName: Joi.string()
      .max(200)
      .required(),
    CompanyID: Joi.required()
  });