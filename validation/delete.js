const isEmpty = require("is-empty");

module.exports = function validateDeleteUser(data) {
    let errors = {};

    if(data.email === "floridaclubgolfteam@gmail.com"){
        errors.error = "Unable to delete root admin";
    }

    return {
        errors,
        isValid: isEmpty(errors),
    }
}