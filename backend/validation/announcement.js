const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateAnnouncementContent(data) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions 
    data.content = !isEmpty(data.content) ? data.content : "";

    if(Validator.isEmpty(data.content)) {
        errors.content = "Unable to make announcement without content";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

