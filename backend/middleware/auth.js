//verify token 
const jwt = require("jsonwebtoken")
const userOriginal = require("../src/models/userRegister");

const auth = async (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try { 
            const token = req.headers.authorization.split(" ")[1];
            const verifyUser = jwt.verify(token, process.env.JWT_keyName);//gives main _id of collection 

            const userDetail = await userOriginal.findById(verifyUser._id).select("-password")
            req.user = userDetail;
            next();
        }
        catch (e) { res.status(402).json("Not loggin yet") }
    }
    else { res.json("Failed to get the token in request") }



}


module.exports = auth;

