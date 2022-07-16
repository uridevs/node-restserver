const { response } = require('express');
const User = require('../models/user')
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-jwt');

 

const login = async (req, res = response) => {

    const {email, password} = req.body;

    try {

        // Check if email exists
        const user = await User.findOne({email});
        if (!user){
            return res.status(400).json({
                msg: 'Email / Password invalid - email'
            })
        }

        // Check if status is active
        if (!user.state){
            return res.status(400).json({
                msg: 'Email / Password invalid - user state: false'
            })
        }

        //Check password
        const isValidPass = bcryptjs.compareSync( password, user.password );
        if (!isValidPass){
            return res.status(400).json({
                msg: 'Email / Password invalid - password'
            })
        }

        //Generate JWT

        const token = await generateJWT( user.id );


        res.json({
            user,
            token,
            msg: 'hola'
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'communicate with admin'
        })
    }

    
}


module.exports = {
    login
}