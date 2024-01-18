const artistService = require("../services/artist.service");

exports.createArtist = (req, res) => {
  artistService
    .createArtist(req.body)
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

exports.updateArtist = (req, res) => {
  artistService
    .updateArtist(req.body, req.params.artistId)
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

exports.deleteArtist = (req, res) => {
  artistService
    .deleteArtist(req.params.artistId)
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

exports.getArtist = (req, res) => {
  artistService
    .getArtist(req.params.artistId)
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
