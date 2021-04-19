const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateEventContent(data) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions 
    data.title = !isEmpty(data.title) ? data.title : "";
    data.date = !isEmpty(data.date) ? data.date : "";
    data.body = !isEmpty(data.body) ? data.body : "";
    data.location = !isEmpty(data.body) ? data.body : "";

    if(Validator.isEmpty(data.title)){
        errors.title = "Unable to make event without title"
    }

    if(Validator.isEmpty(data.date)){
        errors.date = "Unable to make event without date"
    }

    if(Validator.isEmpty(data.body)) {
        errors.body = "Unable to make event without body";
    }

    if(Validator.isEmpty(data.location)) {
        errors.location = "Unable to make event without location";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

