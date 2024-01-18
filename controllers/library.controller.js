const libraryService = require("../services/library.service");

exports.addSongToLibrary = (req, res) => {
  libraryService
    .addSongToLibrary(req.body, req.params.songId, res.locals.user)
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

exports.addAlbumToLibrary = (req, res) => {
  libraryService
    .addAlbumToLibrary(req.body, req.params.albumId, res.locals.user)
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

exports.removeSongFromLibrary = (req, res) => {
  libraryService
    .removeSongFromLibrary(req.params.songId, res.locals.user)
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

exports.getSongsByArtistFromLibrary = (req, res) => {
  libraryService
    .getSongsByArtistFromLibrary(req.params.artistId, res.locals.user)
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

exports.getSongsByAlbumFromLibrary = (req, res) => {
  libraryService
    .getSongsByAlbumFromLibrary(req.params.albumId, res.locals.user)
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

exports.getSongsByArtist = (req, res) => {
  libraryService
    .getSongsByArtist(req.params.artistId)
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

exports.getSongsByAlbum = (req, res) => {
  libraryService
    .getSongsByAlbum(req.params.albumId)
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
