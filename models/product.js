const {Schema, model} = require('mongoose');

const ProductSchema = Schema({
    name:{
        type: String,
        required: [true, 'Product name is required'],
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
    },
    price:{
        type: Number,
        default: 0
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Category is required']
    },
    description:{type: String,},
    available:{type: Boolean, default:true},
    img: {type: String}
});

ProductSchema.methods.toJSON = function(){
    const {__v, state, ...data} = this.toObject();
    return data;
}

module.exports = model( 'Product', ProductSchema );