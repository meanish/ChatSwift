const userOriginal = require("../src/models/userRegister");

async function SearchController(req, res) {
  try {
    const keyword = req.query.keyword;
    const regex = new RegExp(keyword, "i");


    console.log("What is the word", keyword)
    console.log("users atres", req.user)


    const users = await userOriginal.find({
      $or: [
        { firstname: regex },
        { lastname: regex },
        {
          $expr: {
            $regexMatch: {
              input: { $concat: ["$firstname", " ", "$lastname"] },
              regex,
            },
          },
        },
      ],
      _id: { $ne: req.user._id },
    });
    console.log("Users", users)

    res.send(users);
  } catch (e) {
    res.status(401).json("Failed finding keyword");
  }
}

module.exports = {
  SearchController,
};
