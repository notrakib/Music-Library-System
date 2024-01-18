const client = require("../utils/database");

exports.addSongToLibrary = async function (data, songId, user) {
  try {
    const { title } = data;

    const result = await client.query(
      "INSERT INTO library (title, user_id, song_id, album_id) VALUES ($1, $2, $3, NULL) RETURNING *",
      [title ? title : `Untitled_${user.user.id}`, user.user.id, songId]
    );

    return result.rows;
  } catch (err) {
    throw new Error(err);
  }
};

exports.addAlbumToLibrary = async function (data, albumId, user) {
  try {
    const { title } = data;

    const result = await client.query(
      "INSERT INTO library (title, song_id, user_id, album_id) VALUES ($1, NULL, $2, $3) RETURNING *",
      [title ? title : `Untitled_${user.user.id}`, user.user.id, albumId]
    );

    return result.rows;
  } catch (err) {
    throw new Error(err);
  }
};

exports.removeSongFromLibrary = async function (songId, user) {
  try {
    const result = await client.query(
      "DELETE FROM library WHERE song_id=$1 AND user_id=$2 AND album_id=NULL RETURNING *",
      [songId, user.user.id]
    );

    return result.rows;
  } catch (err) {
    throw new Error(err);
  }
};

exports.getSongsByArtistFromLibrary = async function (artistId, user) {
  try {
    const result = await client.query(
      "SELECT s.id, s.title, s.duration, s.release_date, s.album_id FROM library l, songs s, artist_album aa where l.song_id=s.id AND s.album_id=aa.album_id AND aa.artist_id=$1 AND l.user_id=$2;",
      [parseInt(artistId), user.user.id]
    );

    return result.rows;
  } catch (err) {
    throw new Error(err);
  }
};

exports.getSongsByAlbumFromLibrary = async function (albumId, user) {
  try {
    const result = await client.query(
      "SELECT s.id, s.title, s.duration, s.release_date, s.album_id FROM library l, songs s, artist_album aa where l.song_id=s.id AND s.album_id=aa.album_id AND aa.album_id=$1 AND l.user_id=$2;",
      [parseInt(albumId), user.user.id]
    );

    return result.rows;
  } catch (err) {
    throw new Error(err);
  }
};

exports.getSongsByArtist = async function (artistId) {
  try {
    const result = await client.query(
      "SELECT s.id, s.title, s.duration, s.release_date, s.album_id FROM songs s, artist_album aa where s.album_id=aa.album_id AND s.artist_id=$1;",
      [parseInt(artistId)]
    );

    return result.rows;
  } catch (err) {
    throw new Error(err);
  }
};

exports.getSongsByAlbum = async function (albumId) {
  try {
    const result = await client.query(
      "SELECT * FROM songs WHERE album_id=$1;",
      [parseInt(albumId)]
    );

    return result.rows;
  } catch (err) {
    throw new Error(err);
  }
};
