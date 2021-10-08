const jwt = require("jsonwebtoken");
module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("authorization");
        if (token) {
            token = token.slice(7);
            jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
                if (err) {
                    return res.status(400).send({
                        success: false,
                        message: "Token Expire"
                    });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            return res.status(404).send({
                success: false,
                message: "Access Denied!, Unauthorised User"
            });
        }
    }
};