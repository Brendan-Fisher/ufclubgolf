const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateTournamentContent(data) {
    let errors = {};
    
    // Convert empty fields to an empty string so we can use validator functions 
    data.title = !isEmpty(data.title) ? data.title : "";
    data.startDate = !isEmpty(data.startDate) ? data.startDate : "";
    data.body = !isEmpty(data.body) ? data.body : "";

    if(Validator.isEmpty(data.title)){
        errors.title = "Unable to make tournament without title"
    }

    if(Validator.isEmpty(data.startDate)){
        errors.date = "Unable to make tournament without start date"
    }

    if(Validator.isEmpty(data.body)) {
        errors.body = "Unable to make tournament without body";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

