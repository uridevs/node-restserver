
const path = require('path');
const fs = require('fs')
const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { uploadFile } = require('../helpers/upload-file');
const {User, Product} = require('../models')
var cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL )

const loadFile = async (req, res = response) => {

    // Images
    try {
        const name = await uploadFile(req.files, ['jpg','gif','jepg','png']);
        res.json({name});
    } catch (error) {
        res.status(400).json({error});
    }
}
    
const updateFile = async (req, res = response) => {

    const {id, collection} = req.params;

    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if (!model){
                return res.status(400).json({
                    msg: `There is not any user with id: ${id}`
                })
            }
        break;

        case 'products':
            model = await Product.findById(id);
            if (!model){
                return res.status(400).json({
                    msg: `There is not any product with id: ${id}`
                })
            }
        break;
    
        default:
           return res.status(500).json({msg: 'Its not validated, contact backend engineer'});
    }

    // Clean previous images

    if (model.img) {
        const pathImg = path.join(__dirname, '../uploads', collection, model.img)
        if (fs.existsSync( pathImg )){
            return res.sendFile( pathImg )
        }

    }

    const name = await uploadFile(req.files, undefined, collection);
    model.img = name;

    await model.save();

    res.json({ model});

}

const updateImageCloudinary = async (req, res = response) => {

    const {id, collection} = req.params;

    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if (!model){
                return res.status(400).json({
                    msg: `There is not any user with id: ${id}`
                })
            }
        break;

        case 'products':
            model = await Product.findById(id);
            if (!model){
                return res.status(400).json({
                    msg: `There is not any product with id: ${id}`
                })
            }
        break;
    
        default:
           return res.status(500).json({msg: 'Its not validated, contact backend engineer'});
    }

    // Clean previous images

    if (model.img) {
        const nameArr = model.img.split('/');
        const name = nameArr[nameArr.length - 1];
        const [public_id] = name.split('.');
        cloudinary.uploader.destroy( public_id );
    }

    const {tempFilePath} = req.files.file;
    const {secure_url} = await cloudinary.uploader.upload( tempFilePath );

    const name = await uploadFile(req.files, undefined, collection);
    model.img = secure_url;

    await model.save();

    res.json({ model });

}




const showImg = async (req, res = response) => {
    
    const {id, collection} = req.params;
    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if (!model){
                return res.status(400).json({
                    msg: `There is not any user with id: ${id}`
                })
            }
        break;

        case 'products':
            model = await Product.findById(id);
            if (!model){
                return res.status(400).json({
                    msg: `There is not any product with id: ${id}`
                })
            }
        break;
    
        default:
           return res.status(500).json({msg: 'Its not validated, contact backend engineer'});
    }

    // Clean previous images

    // if (model.img) {
    //     const pathImg = path.join(__dirname, '../uploads', collection, model.img)
    //     if (fs.existsSync( pathImg )){
    //         return res.sendFile( pathImg )
    //     }
    // }

    if (model.img) {
        console.log(model.img)
        return res.json( {img: model.img} )
    }

    const pathDefault = path.join(__dirname, '../assets', 'no-image.jpg')
    res.sendFile( pathDefault )
}

module.exports = {
    loadFile,
    updateFile,
    showImg,
    updateImageCloudinary
}