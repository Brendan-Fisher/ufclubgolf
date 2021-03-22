const isEmpty = require("is-empty");

module.exports = function validatePromoteUser(data) {
    let errors = {};
    let newType = "";

    if(data.memberType === "admin"){
        errors.error = "Unable to promote root admin";
        newType = "admin";
    }
    
    if (data.memberType === "pending") newType = "member";
    else if (data.memberType === "member") newType = "exec";
    else if (data.memberType === "exec") newType = "admin";

    return {
        errors,
        isValid: isEmpty(errors),
        newType
    }
}