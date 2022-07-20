const { response } = require("express");
const { User, Category, Product } = require("../models");
const {ObjectId} = require('mongoose').Types;

const collectionsAllowed = [
    'categories',
    'products',
    'roles',
    'users'
]

const searchUsers = async (term='', res = response)=>{

    const isMongoID = ObjectId.isValid( term );

    if (isMongoID){
        const user = await User.findById(term);
        return res.json({
            results: (user) ? [user] : []
        });
    }

    const regex = new RegExp(term, 'i')

    const users = await User.find({
        $or: [{name: regex}, {email: regex}],
        $and: [{state: true}]
    })

    res.json({
        results: users
    });
}

const searchCategories = async (term='', res = response)=>{

    const isMongoID = ObjectId.isValid( term );

    if (isMongoID){
        const category = await Category.findById(term);
        return res.json({
            results: (category) ? [category] : []
        });
    }

    const regex = new RegExp(term, 'i')

    const categories = await Category.find({name: regex, state: true})

    res.json({
        results: categories
    });
}

const searchProducts = async (term='', res = response)=>{

    const isMongoID = ObjectId.isValid( term );

    if (isMongoID){
        const product = await Product.findById(term).populate('category', 'name');
        return res.json({
            results: (product) ? [product] : []
        });
    }

    const regex = new RegExp(term, 'i')

    const products = await Product.find({
        $or: [{name: regex}, {description: regex}],
        $and: [{state: true}]
    }).populate('category', 'name');

    res.json({
        results: products
    });
}

const search = (req, res = response) => {

    const {collection, term} = req.params;

    if ( !collectionsAllowed.includes(collection)){
        return res.status(400).json({
            msg: `Error - Allowed collections to search are: ${collectionsAllowed}`
        })
    }

    switch (collection) {
        case 'users':
            searchUsers(term, res);
            break;
        case 'categories':
            searchCategories(term, res);
            break;
        case 'products':
            searchProducts(term, res)
            break;
        case 'roles':
        
            break;
        
        default:
            res.status(500).json({
                msg: 'This search should be included'
            })
    
    }

    // res.json({
    //     collection,
    //     term
    // })

}

module.exports = {
    search
}