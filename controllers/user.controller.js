const userService = require("../services/user.service");

exports.postSignUpUser = (req, res) => {
  userService
    .signUpUser(req.body)
    .then((response) => {
      return res.status(200).json({
        data: response,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
};

exports.postSignInUser = (req, res) => {
  userService
    .signInUser(req.body)
    .then((response) => {
      return res.status(200).json({
        data: response,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
};
