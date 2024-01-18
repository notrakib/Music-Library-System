const Joi = require("joi");

const albumSchema = Joi.object({
  title: Joi.string().min(3).max(15).required(),
  genre: Joi.string().min(3).max(15).required(),
  total_tracks: Joi.number().integer().positive(),
  release_year: Joi.number().integer().min(1800).max(2024).required(),
});

exports.createAlbum = async (req, res, next) => {
  try {
    await albumSchema.validateAsync(req.body);

    next();
  } catch (err) {
    return res.status(401).json({ validationError: err.details[0] });
  }
};

exports.updateAlbum = async (req, res, next) => {
  try {
    albumSchema.optional("title", "genre", "total_tracks", "release_year");

    await albumSchema.validateAsync(req.body);
    next();
  } catch (err) {
    return res.status(401).json({ validationError: err.details[0] });
  }
};
