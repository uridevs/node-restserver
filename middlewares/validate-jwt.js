const { response, request } = require('express')
const jwt = require('jsonwebtoken')

const User = require('../models/user.js')


const validateJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token')

    if (!token) {
        return res.status(400).json({
            msg: 'There is no token on the request'
        })
    }

    try {

        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY)

        const user = await User.findById(uid);
        if(!user){
            return res.status(401).json({
                msg: 'Token invalid - User not found in DB'
            })
        }
        // Check if ID's state is True

        if (!user.state){
            return res.status(401).json({
                msg: 'Token invalid - User deleted'
            })
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: 'Invalid token'
        })
    }

    

}

module.exports = {
    validateJWT
}