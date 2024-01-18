const client = require("../utils/database");

exports.createAlbum = async function (data) {
  try {
    const { title, genre, total_tracks, release_year } = data;

    const result = await client.query(
      "INSERT INTO albums (title, genre, total_tracks, release_year) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, genre, total_tracks, release_year]
    );

    return result.rows;
  } catch (err) {
    throw new Error(err);
  }
};

exports.updateAlbum = async function (data, albumId) {
  try {
    const { title, genre, total_tracks, release_year } = data;

    const findAlbum = await client.query("SELECT * FROM albums WHERE id= $1", [
      parseInt(albumId),
    ]);

    const album_isExist = findAlbum.rows[0];

    if (!album_isExist) {
      throw new Error("Album doesnot exist");
    }

    const result = await client.query(
      "UPDATE albums SET title=$1, genre=$2, total_tracks=$3, release_year=$4 WHERE id=$5 RETURNING *",
      [
        title ? title : album_isExist.title,
        genre ? genre : album_isExist.genre,
        total_tracks ? total_tracks : album_isExist.total_tracks,
        release_year ? release_year : album_isExist.release_year,
        albumId,
      ]
    );

    return result.rows;
  } catch (err) {
    throw new Error(err);
  }
};

exports.deleteAlbum = async function (albumId) {
  try {
    const result = await client.query(
      "DELETE FROM albums WHERE id=$1 RETURNING *",
      [parseInt(albumId)]
    );

    return result.rows;
  } catch (err) {
    throw new Error(err);
  }
};

exports.getAlbum = async function (albumId) {
  try {
    const findAlbum = await client.query("SELECT * FROM albums WHERE id= $1", [
      parseInt(albumId),
    ]);

    const album_isExist = findAlbum.rows[0];

    if (!album_isExist) {
      throw new Error("Album doesnot exist");
    }

    return album_isExist;
  } catch (err) {
    throw new Error(err);
  }
};
