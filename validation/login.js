const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Veuillez vérifier votre adresse Email";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "l'adresse Email entrée est invalide";
  }
  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Un mot de passe est requis";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
