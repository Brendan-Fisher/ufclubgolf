const Validator = require("validator");
const isEmpty = require("is-empty");


/**
 * Validate Announcement Content
 */
const validateAnnouncementContent = (data) => {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions 
    data.content = !isEmpty(data.announcement) ? data.announcement : "";

    if(Validator.isEmpty(data.announcement)) {
        errors.content = "Unable to make announcement without content";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


/**
 * Validate Event Content
 */
const validateEventContent = (data) => {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions 
    data.title = !isEmpty(data.title) ? data.title : "";
    data.date = !isEmpty(data.date) ? data.date : "";
    data.plaintext = !isEmpty(data.plaintext) ? data.plaintext : "";
    data.location = !isEmpty(data.body) ? data.body : "";

    if(Validator.isEmpty(data.title)){
        errors.title = "Unable to make event without title"
    }

    if(Validator.isEmpty(data.date)){
        errors.date = "Unable to make event without date"
    }

    if(Validator.isEmpty(data.plaintext)){
        errors.plaintext = "Unable to make event without description"
    }

    if(Validator.isEmpty(data.location)) {
        errors.location = "Unable to make event without location";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


/**
 * Validate Post Content
 */
const validatePostContent = (data) => {
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


/**
 * Validate Tournament Result Content
 */
const validateTournamentContent = (data) => {
    let errors = {};
    
    // Convert empty fields to an empty string so we can use validator functions 
    data.title = !isEmpty(data.title) ? data.title : "";
    data.startDate = !isEmpty(data.startDate) ? data.startDate : "";
    data.body = !isEmpty(data.body) ? data.body : "";

    if(Validator.isEmpty(data.title)){
        errors.title = "Unable to make tournament without title"
    }

    if(Validator.isEmpty(data.startDate)){
        errors.startDate = "Unable to make tournament without start date"
    }

    if(Validator.isEmpty(data.body)) {
        errors.body = "Unable to make tournament without body";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


/**
 * Validate Register Form Content
 */
const validateRegisterInput = (data) => {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
    data.lastname = !isEmpty(data.lastname) ? data.lastname : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";
    data.memberType = !isEmpty(data.memberType) ? data.memberType : "";
    data.number = !isEmpty(data.number) ? data.number : "";
    data.facebook = !isEmpty(data.facebook) ? data.facebook : "";

    // Name checks
    if (Validator.isEmpty(data.firstname)) {
        errors.firstname = "First Name field is required";
    }
    if (Validator.isEmpty(data.lastname)) {
        errors.lastname = "Last Name field is required";
    }
    // Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } 
    else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be at least 6 characters";
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}


/**
 * Validate Login Form Content
 */
const validateLoginInput = (data) => {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    // Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } 
    else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}


/**
 * Validate User Deletion Attempt
 */
const validateDeleteUser = (data) => {
    let errors = {};

    if(data.email === "floridaclubgolfteam@gmail.com" || data.email === "gatorsclubgolf@gmail.com"){
        errors.error = "Unable to delete root admin";
    }

    return {
        errors,
        isValid: isEmpty(errors),
    }
}


/**
 * Validate User Promotion Attempt
 */
const validatePromoteUser = (data) => {
    let errors = {};
    let newType = "";

    if(data.memberType === "admin"){
        errors.error = "Unable to promote admin";
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


/**
 * Validate User Demotion Attempt
 */
const validateDemoteUser = (data) => {
    let errors = {};
    let newType = "";

    if(data.email === "floridaclubgolfteam@gmail.com" || data.email === "gatorsclubgolf@gmail.com"){
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



exports.validateAnnouncementContent = validateAnnouncementContent;
exports.validateEventContent = validateEventContent;
exports.validatePostContent = validatePostContent;
exports.validateTournamentContent = validateTournamentContent;
exports.validateRegisterInput = validateRegisterInput;
exports.validateLoginInput = validateLoginInput;
exports.validateDeleteUser = validateDeleteUser;
exports.validatePromoteUser = validatePromoteUser;
exports.validateDemoteUser = validateDemoteUser;





