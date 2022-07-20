const {Schema, model} = require('mongoose');

const CategorySchema = Schema({
    name:{
        type: String,
        required: [true, 'Category name is required'],
        unique: true
    },
    state:{
        type: Boolean,
        default: true,
        required: [true, 'State is required']
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User creator is required']
    }
});


CategorySchema.methods.toJSON = function(){
    const {__v, state, ...data} = this.toObject();
    return data;
}

module.exports = model( 'Category', CategorySchema );