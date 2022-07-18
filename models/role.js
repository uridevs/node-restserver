
const {Schema, model} = require('mongoose');

const RoleSchema = Schema({
    role:{
        type: String,
        required: [true, 'Role is required'],
        default: "USER_ROLE"
    }
});

module.exports = model( 'Role', RoleSchema );