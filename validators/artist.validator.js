const Joi = require("joi");

const artistSchema = Joi.object({
  birth_date: Joi.date().required(),
  nationality: Joi.string().min(3).max(15).required(),
  user_id: Joi.number().integer().positive().required().invalid(1),
});

exports.createArtist = async (req, res, next) => {
  try {
    await artistSchema.validateAsync(req.body);

    next();
  } catch (err) {
    return res.status(401).json({ validationError: err.details[0] });
  }
};

exports.updateArtist = async (req, res, next) => {
  try {
    artistSchema.optional("birth_date", "nationality", "user_id");

    await artistSchema.validateAsync(req.body);
    next();
  } catch (err) {
    return res.status(401).json({ validationError: err.details[0] });
  }
};
