const Role = require('../models/role');
const mongoose = require('mongoose');

const { Category, User, Product } = require('../models');
const { collection } = require('../models/role');

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

// Verify if the id provided for a category exists on DB
const categoryExists = async ( id ) => {
    const idExists = await Category.findById(id);
    if ( !idExists ){
            throw new Error(`Id: ${id} is not registed in database `)
        }
    }

const productExists = async ( id ) => {
    const idExists = await Product.findById(id);
    if ( !idExists ){
            throw new Error(`Product ID: ${id} is not registed in database `)
        }
    }

// Validate allowed collections

const allowedCollections = ( collection = '', collections = [] ) => {
    const included = collections.includes(collection);

    if (!included){
        throw new Error(`Collection ${collection} is not allowed, please choose one of the next collection: ${collections}`)
    }

    return true
}

module.exports = {
    isRoleValid,
    emailExists,
    userByIdExists,
    categoryExists,
    productExists,
    allowedCollections
}