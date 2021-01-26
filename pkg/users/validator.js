const { Validator } = require('node-input-validator');

const registrationSchema = {
    first_name: 'required|minLength:3',
    last_name: 'required|minLength:4',
    email: 'required|email',
    password: 'required',
    dob: 'required'
};

const loginSchema = {
    email: 'required|email',
    password: 'required'
};

const changePasswordSchema = {
    email: 'required|email',
    password: 'required',
    new_password: 'required',
    confirm_password: 'required'
};

const resetPasswordSchema = {
    new_password: 'required',
    confirm_password: 'required',
    reset_hash: 'required|minLength:40'
};

const validate = async (data, schema) => {
    let v = new Validator(data, schema);
    // return await v.check();
    let e = await v.check();
    if (!e) {
        throw v.errors;
    }
};

module.exports = {
    registrationSchema,
    loginSchema,
    changePasswordSchema,
    resetPasswordSchema,
    validate
};