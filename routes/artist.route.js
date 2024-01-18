const express = require("express");
const router = express.Router();
const ArtistController = require("../controllers/artist.controller");
const AuthorizeAdminMiddleware = require("../middlewares/authorizeAdmin");
const ValidateArtist = require("../validators/artist.validator");

router.post("/create-artist", AuthorizeAdminMiddleware, ValidateArtist.createArtist, ArtistController.createArtist);
router.post("/update-artist/:artistId", AuthorizeAdminMiddleware, ValidateArtist.updateArtist, ArtistController.updateArtist);
router.delete("/delete-artist/:artistId", AuthorizeAdminMiddleware, ArtistController.deleteArtist);
router.get("/get-artist/:artistId", AuthorizeAdminMiddleware, ArtistController.getArtist);

module.exports = router;