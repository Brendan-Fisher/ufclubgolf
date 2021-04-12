const isEmpty = require("is-empty");

module.exports = function validateDemoteUser(data) {
    let errors = {};
    let newType = "";

    if(data.email === "gatorsclubgolf@gmail.com"){
        errors.error = "Unable to demote root admin";
    }
    
    if (data.memberType === "pending") newType = "pending";
    else if (data.memberType === "member") newType = "pending";
    else if (data.memberType === "exec") newType = "member";
    else newType = "exec";

    return {
        errors,
        isValid: isEmpty(errors),
        newType
    }
}