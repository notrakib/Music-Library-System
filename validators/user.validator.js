const Joi = require("joi");

const userSchema = Joi.object({
  first_name: Joi.string().max(15).required(),
  last_name: Joi.string().max(15),
  email: Joi.string().email().max(15).required(),
  password: Joi.string().min(6).max(100).required(),
});

exports.signUp = async (req, res, next) => {
  try {
    await userSchema.validateAsync(req.body);

    next();
  } catch (err) {
    if (err) return res.status(401).json({ validationError: err.details[0] });
  }
};

exports.signIn = async (req, res, next) => {
  try {
    const userSignInSchema = userSchema.fork(
      ["first_name", "last_name"],
      (schema) => schema.forbidden()
    );

    await userSignInSchema.validateAsync(req.body);
    next();
  } catch (err) {
    return res.status(401).json({ validationError: err.details[0] });
  }
};
