const { response } = require("express");
const { Product } = require("../models");

// Show existing products
const getProducts = async (req, res = response) => {
    const {limit=5, from=0}  = req.query;
    const query = {state: true}

    const [total, products] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
        .populate('user', 'name')
        .populate('category', 'name')
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.json({
        total,
        products
    })
}

const getProduct = async (req, res = response) => {
    
    const { id }  = req.params;
    const product = await Product.findById( id ).populate('user', 'name');

    res.json({
        product
    })
}

// Add new product to database
const createProduct = async (req,res= response) => {
    
    const { state, user, ...body} = req.body;
    const name = body.name.toUpperCase();
    // const price = req.body.price;
    // const category = req.body.category;
    // const description = req.body.description;
    // const available = req.body.available;

    const productDB = await Product.findOne({name});

    if(productDB){
        return res.status(400).json({
            msg: `Product: ${productDB.name}, already exists`
        });
    }

    // Generate Data to store

    const data = {
        ...body,
        name, 
        user: req.user._id,
    }

    const product = await new Product(data);
    await product.save();

    res.status(201).json(product)

}

const updateProduct = async (req, res = response) => {

    const { id } = req.params;
    const {state, user, ...data} = req.body;

    if (data.name){
        data.name = data.name.toUpperCase()
    }

    data.user = req.user._id;

    const updProduct = await Product.findByIdAndUpdate(id, data, {new: true})

    res.json({updProduct});
}


// Delete category (state to false)

const productDelete = async (req, res = response) => {

    const { id } = req.params;
    
    const delProduct = await Product.findByIdAndUpdate(id, {state:false}, {new: true})

    res.json({delProduct});
}

module.exports = {
    createProduct,
    getProducts,
    getProduct,
    productDelete,
    updateProduct
}