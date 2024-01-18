const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const ValidateUser = require("../validators/user.validator");

router.post("/sign-up", ValidateUser.signUp, UserController.postSignUpUser);
router.post("/sign-in", ValidateUser.signIn, UserController.postSignInUser);

module.exports = router;