const userLoginOriginal = require("../src/models/userLogin");
const UserOriginal = require("../src/models/userRegister");
const bcrypt = require("bcryptjs");

module.exports = {


  LogUser: async (req, res) => {
    try {
      const { email } = req.body;
      const { password } = req.body;
      //form form validation errror
      const error = await userLoginOriginal.validateLogin(req.body, res);
      if (error) {
        throw error;
      }

      //for valid user or not 
      const userData = await UserOriginal.findOne({ email: email }); //if there exist email then take the document of it not only email



      if (userData === null) {
        throw { errors: { email: ["Your Email is not registered yet."] } };
      }


      const haspassword = await bcrypt.compare(password, userData.password); //comparing password with hash password

      if (haspassword) {
        //if true login sucessful
        const token = await userData.generateAuthToken(); //calliing funct to generate token


        if (userData && userData.tokens && userData.tokens.length > 0) {
          // Reverse the tokens array
          userData.tokens.reverse();
        }

        throw { userData, token };

      } else {
        throw {
          errors: { password: ["Your Password doesnot match the email."] },
        };
      }
    } catch (e) {
      res.send(e); //this is helping to send error to frontend
    }
  },
};
