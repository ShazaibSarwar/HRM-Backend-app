const Joi = require('joi')

exports.DepartmentValidation = Joi.object().keys({
    DepartmentName: Joi.string()
      .max(200)
      .required(),
    CompanyID: Joi.required()
  });
  