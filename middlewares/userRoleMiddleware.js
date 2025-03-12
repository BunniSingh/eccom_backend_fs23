const userRoleMiddleware = (...allowRoles) => (req, res, next) => {
    if(allowRoles.includes(req.user.userRole)){
        next();
    }else{
        return res.status(403).json({
            success: false,
            message: "You don not have permission to perform this action"
        })
    }
}

module.exports = userRoleMiddleware;