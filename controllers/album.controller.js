const albumService = require("../services/album.service");

exports.createAlbum = (req, res) => {
  albumService
    .createAlbum(req.body)
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

exports.updateAlbum = (req, res) => {
  albumService
    .updateAlbum(req.body, req.params.albumId)
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

exports.deleteAlbum = (req, res) => {
  albumService
    .deleteAlbum(req.params.albumId)
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

exports.getAlbum = (req, res) => {
  albumService
    .getAlbum(req.params.albumId)
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
