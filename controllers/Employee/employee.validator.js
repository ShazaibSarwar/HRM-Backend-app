const Joi = require('joi')

exports.EmployeeValidation = Joi.object().keys({
    RoleID: Joi.optional(),
    PositionID: Joi.optional(),
    DepartmentID: Joi.optional(),
    SalaryID: Joi.optional(),
    FirstName: Joi.string()
      .max(200)
      .required(),
    MiddleName: Joi.string()
      .max(200)
      .required(),
    LastName: Joi.string()
      .max(200)
      .required(),
    Email: Joi.string()
      .max(200)
      .required(),
    Password: Joi.string()
      .max(100)
      .required(),
    Gender: Joi.string()
      .max(100)
      .required(),
    DOB: Joi.date().required(),
    DateOfJoining: Joi.date().required(),
    TerminateDate: Joi.date().optional(),
    Deleted: Joi.optional(),
    Photo: Joi.optional(),
    ContactNo: Joi.string()
      .max(20)
      .required(),
    EmployeeCode: Joi.string()
      .max(100)
      .required(),
    Account: Joi.number()
      .max(3)
      .required()
  });