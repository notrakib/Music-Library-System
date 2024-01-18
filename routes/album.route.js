const express = require("express");
const router = express.Router();
const AlbumController = require("../controllers/album.controller");
const AuthorizeAdminMiddleware = require("../middlewares/authorizeAdmin");
const ValidateAlbum = require("../validators/album.validator");

router.post("/create-album", AuthorizeAdminMiddleware, ValidateAlbum.createAlbum, AlbumController.createAlbum);
router.post("/update-album/:albumId", AuthorizeAdminMiddleware, ValidateAlbum.updateAlbum, AlbumController.updateAlbum);
router.delete("/delete-album/:albumId", AuthorizeAdminMiddleware, AlbumController.deleteAlbum);
router.get("/get-album/:albumId", AuthorizeAdminMiddleware, AlbumController.getAlbum);

module.exports = router;
