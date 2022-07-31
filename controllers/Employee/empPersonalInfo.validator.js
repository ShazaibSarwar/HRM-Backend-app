const Joi = require('joi')

exports.EmployeePersonalInfoValidation = Joi.object().keys({
    BloodGroup: Joi.string()
      .max(10)
      .required(),
    DOB: Joi.date().required(),
  
    ContactNo: Joi.string()
      .max(20)
      .required(),
    Email: Joi.string()
      .max(200)
      .required(),
    EmergencyContactNo: Joi.string()
      .max(20)
      .required(),
    Gender: Joi.string()
      .max(100)
      .required(),
    Hobbies: Joi.string()
      .max(1000)
      .required(),
    PANcardNo: Joi.string()
      .max(50)
      .required(),
    PermanetAddress: Joi.string()
      .max(200)
      .required(),
    PresentAddress: Joi.string()
      .max(200)
      .required()
  });