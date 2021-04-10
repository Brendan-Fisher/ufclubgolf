const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validatePostContent(data) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions 
    data.title = !isEmpty(data.title) ? data.title : "";
    data.category = !isEmpty(data.category) ? data.category : "";
    data.body = !isEmpty(data.body) ? data.body : "";

    if(Validator.isEmpty(data.title)){
        errors.title = "Unable to make post without title"
    }

    if(Validator.isEmpty(data.category)){
        errors.category = "Unable to make post without category"
    }

    if(Validator.isEmpty(data.body)) {
        errors.body = "Unable to make post without body";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

