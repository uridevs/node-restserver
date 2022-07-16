const { response, request } = require('express');
const bcryptjs = require('bcryptjs')
const User = require('../models/user');


const usersGet = async (req, res = response) => {

    // const {q, nombre, api_key, page=1, limit=1} = req.query;
    const {limit=5, from=0} = req.query;
    const query = {state: true};

    // Use of Promise.all to send both request at the same time to reduce Time of response, instead of asking for to consts to await for each response and store it
    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ]);
    
    res.json({
        total,
        users
    });
}

const usersPost = async (req, res = response) => {

    const { name, email, password, role } = req.body;
    const user = new User( {name, email, password, role} );

    // Encrypt password

    const salt = bcryptjs.genSaltSync(10);
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    res.json({
        user
    });
}

const usersPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, email, ...rest } = req.body;

    //TODO validate id against database

    if (password){
        const salt = bcryptjs.genSaltSync(10);
        rest.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate( id, rest );

    res.json(user);
}

const usersDelete = async (req, res = response) => {

    const { id } = req.params;

    // Hard Delete from database
    // const user = await User.findByIdAndDelete( id );

    const user = await User.findByIdAndUpdate(id, {state:false})
    const authUser = req.user;

    res.json({
        user,
        authUser
    });
}

const usersPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - controlador'
    });
}



module.exports = {
    usersGet,
    usersDelete,
    usersPatch,
    usersPost,
    usersPut
}