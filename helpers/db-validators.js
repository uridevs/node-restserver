const Role = require('../models/role');
const User = require('../models/user');
const mongoose = require('mongoose');

// Verify if role sent to backend to register is valid
const isRoleValid = async (role = "") => {
    const roleExists = await Role.findOne({ role })
    if (!roleExists){
        throw new Error(`${role} role is not registered in our database `)
    }
}

// Verify if an email sent to backend to register already exists
const emailExists = async (email = "") => {

    const emailExists = await User.findOne({ email });
    if ( emailExists ){
            throw new Error(`${email} has already been registered `)
        }
    }

// Verify if an user ID sent to backend to be updated already exists
const userByIdExists = async ( id ) => {

    const idExists = await User.findById(id);
    if ( !idExists ){
            throw new Error(`Id: ${id} is not registed in database `)
        }
    }

module.exports = {
    isRoleValid,
    emailExists,
    userByIdExists
}