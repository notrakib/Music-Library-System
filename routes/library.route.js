const express = require("express");
const router = express.Router();
const LibraryController = require("../controllers/library.controller");
const AuthorizeUserMiddleware = require("../middlewares/authorizeUser");
const ValidateLibrary = require("../validators/library.validator");

router.post("/add-song-to-library/:songId", AuthorizeUserMiddleware, ValidateLibrary.addSong, LibraryController.addSongToLibrary);
router.post("/add-album-to-library/:albumId", AuthorizeUserMiddleware, ValidateLibrary.addAlbum, LibraryController.addAlbumToLibrary);
router.delete("/remove-song-from-library/:songId", AuthorizeUserMiddleware, LibraryController.removeSongFromLibrary);
router.get("/get-song-by-artist-from-library/:artistId", AuthorizeUserMiddleware, LibraryController.getSongsByArtistFromLibrary);
router.get("/get-song-by-album-from-library/:albumId", AuthorizeUserMiddleware, LibraryController.getSongsByAlbumFromLibrary);
router.get("/get-song-by-artist/:artistId", AuthorizeUserMiddleware, LibraryController.getSongsByArtist);
router.get("/get-song-by-album/:albumId", AuthorizeUserMiddleware, LibraryController.getSongsByAlbum);

module.exports = router;