const Joi = require("joi");

const librarySchema = Joi.object({
  title: Joi.string().max(15),
  album_id: Joi.number().integer().positive().required(),
  user_id: Joi.number().integer().positive().invalid(1).required(),
  song_id: Joi.number().integer().positive().required(),
});

exports.addSong = async (req, res, next) => {
  try {
    const newLibrarySchema = librarySchema.fork(["album_id"], (schema) =>
      schema.forbidden()
    );
    await newLibrarySchema.validateAsync(req.body);

    next();
  } catch (err) {
    return res.status(401).json({ validationError: err.details[0] });
  }
};

exports.addAlbum = async (req, res, next) => {
  try {
    const newLibrarySchema = librarySchema.fork(["song_id"], (schema) =>
      schema.forbidden()
    );
    await newLibrarySchema.validateAsync(req.body);

    next();
  } catch (err) {
    return res.status(401).json({ validationError: err.details[0] });
  }
};
