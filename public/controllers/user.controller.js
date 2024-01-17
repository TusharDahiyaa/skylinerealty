const User = require("../model/user.model");

exports.signup = async (req, res) => {
  const userObj = {
    name: req.body.name,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    userMessage: req.body.userMessage,
    sendStatus: req.body.sendStatus,
  };
  var filter =
    /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9]+[a-zA-Z0-9.-]+[a-zA-Z0-9]+\.[a-z]{1,4}$/;

  try {
    if (
      userObj.name != "" &&
      filter.test(userObj.email) &&
      userObj.phoneNumber.length === 10
    ) {
      const userCreated = await User.create(userObj);
      const postResponse = {
        name: userCreated.name,
        email: userCreated.email,
        phoneNumber: userCreated.phoneNumber,
        userMessage: userCreated.userMessage,
        message: "User successfully created with the above details.",
      };
      // res.status(201)send(postResponse);
      res.status(201).redirect("../signedUp.html");
    } else {
      // res.status(200).send("Invalid format entered. Please Check!")
      res.status(201).redirect("./public/invalidFormat.html");
    }
  } catch (err) {
    console.log("Some error while saving the user in Database", err.message);
    res.status(500).send({
      message: "Some internal error while inserting the element",
    });
  }
};
