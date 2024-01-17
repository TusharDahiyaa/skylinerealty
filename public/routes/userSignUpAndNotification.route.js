const userController = require("../controllers/user.controller");

module.exports = function (app) {
  app.post("/signUp", userController.signup);
};
