const { request, response } = require("express")

const isAdminRole = (req, res = response, next) => {
    if (!req.user){
        return res.status(500).json({
            msg: 'System is trying to verify Role without checking token first'
        })
    }

    try {

        const {role, name} = req.user;
        if (role !== 'ADMIN_ROLE') {
            return res.status(401).json({
                msg: `${name} is not an Admin - Can't perform this action`
            })
        }
        next();
    } catch (error) {
        
    }
}

const hasRole = ( ...roles ) => {
    
    return (req, res = response, next) => {
        if (!req.user){
            return res.status(500).json({
                msg: 'System is trying to verify Role without checking token first'
            })
        }

        if ( !roles.includes(req.user.role)){
            return res.status(401).json({
                msg: `Service require one of those roles: ${roles}`
            })
        }

        next();
    }
}

module.exports = {
    isAdminRole,
    hasRole
}