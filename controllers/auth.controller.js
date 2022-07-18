const { response, json } = require('express');
const User = require('../models/user')
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google.verify');

 

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
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'communicate with admin'
        })
    }

}

const googleSignIn = async (req, res=response) => {

    const { id_token } = req.body;

    try {
        
        const {email, name, picture } = await googleVerify( id_token );
        
        let user = await User.findOne({ email });

        if (!user){
            // Create new user
            const data = {
                name,
                email,
                password: 'p',
                picture,
                google: true,
            };

            user = new User(data);
            await user.save();
        }

        if (!user.state){
            return res.status(401).json({
                msg: 'Ask an admin - User disabled'
            })
        }

        // Generate Token
        const token = await generateJWT( user.id );

        res.json({
            user,
            id_token
        })

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'Token couldnt be verified'
        })
        console.log(error)
    }
   
}


module.exports = {
    login,
    googleSignIn
}