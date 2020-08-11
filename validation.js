const Joi = require("@hapi/joi");

// Admin validation
const adminRegisterValiation = (data) => {
  const shema = Joi.object({
    login: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
  });
  return shema.validate(data);
};

const adminLoginValidation = (data) => {
  const shema = Joi.object({
    login: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
  });
  return shema.validate(data);
};

module.exports.adminRegisterValidation = adminRegisterValiation;
module.exports.adminLoginValidation = adminLoginValidation;
