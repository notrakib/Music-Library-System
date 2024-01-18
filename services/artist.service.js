const client = require("../utils/database");

exports.createArtist = async function (data) {
  try {
    const { birth_date, nationality, user_id } = data;

    const result = await client.query(
      "INSERT INTO artists (birth_date, nationality, user_id) VALUES ($1, $2, $3) RETURNING *",
      [birth_date, nationality, user_id]
    );

    return result.rows;
  } catch (err) {
    throw new Error(err);
  }
};

exports.updateArtist = async function (data, artistId) {
  try {
    const { birth_date, nationality, user_id } = data;

    const findArtist = await client.query(
      "SELECT * FROM artists WHERE id= $1",
      [parseInt(artistId)]
    );

    const artist_isExist = findArtist.rows[0];

    if (!artist_isExist) {
      throw new Error("Artist doesnot exist");
    }

    const result = await client.query(
      "UPDATE artists SET birth_date=$1, nationality=$2, user_id=$3 WHERE id=$4 RETURNING *",
      [
        birth_date ? birth_date : artist_isExist.birth_date,
        nationality ? nationality : artist_isExist.nationality,
        user_id ? user_id : artist_isExist.user_id,
        artistId,
      ]
    );

    return result.rows;
  } catch (err) {
    throw new Error(err);
  }
};

exports.deleteArtist = async function (artistId) {
  try {
    const result = await client.query(
      "DELETE FROM artists WHERE id=$1 RETURNING *",
      [parseInt(artistId)]
    );

    return result.rows;
  } catch (err) {
    throw new Error(err);
  }
};

exports.getArtist = async function (artistId) {
  try {
    const findArtist = await client.query(
      "SELECT * FROM artists WHERE id= $1",
      [parseInt(artistId)]
    );

    const artist_isExist = findArtist.rows[0];

    if (!artist_isExist) {
      throw new Error("Artist doesnot exist");
    }

    return artist_isExist;
  } catch (err) {
    throw new Error(err);
  }
};
