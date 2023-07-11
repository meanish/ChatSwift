const chats = require("../Data/data");
const userOriginal = require("../src/models/userRegister");

module.exports = {
  ShowUser: (req, res) => {
    res.send(chats);
  },

  AddUser: async (req, res, next) => {
    try {
      const error = await userOriginal.validateRegister(req.body, res, next);

      if (error) {
        console.log(error);
        throw error;
      } else {
        const registerData = new userOriginal({
          firstname: req.body.firstname, //from the form
          lastname: req.body.lastname,
          password: req.body.password,
          password_confirmation: req.body.password_confirmation,
          email: req.body.email,
          address: req.body.address,
        });

        const token = await registerData.generateAuthToken();

        await registerData.save();
        // console.log('Saved user data:', registerData);

        // console.log('Generated auth token:', registerData.authToken);
        res.status(200).json({ registerData });
        // next();
      }
    } catch (err) {
      res.send(err);
      console.log("Throw Errors of userRegisterController in frontend");
    }
  },
};
