const client = require("./database");
const bcrypt = require("bcrypt");

const configDataBase = async () => {
  try {
    await client.connect();

    await client.query(
      "CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, first_name VARCHAR(15) NOT NULL, last_name VARCHAR(15), email VARCHAR(15) UNIQUE NOT NULL, password VARCHAR(100) NOT NULL);"
    );

    await client.query(
      "CREATE TABLE IF NOT EXISTS artists(id SERIAL PRIMARY KEY, birth_date DATE NOT NULL, nationality VARCHAR(15) NOT NULL, user_id INTEGER UNIQUE REFERENCES users(id) NOT NULL);"
    );

    await client.query(
      "CREATE TABLE IF NOT EXISTS albums(id SERIAL PRIMARY KEY, title VARCHAR(15) NOT NULL, genre VARCHAR(15) NOT NULL, total_tracks INTEGER, release_year INTEGER NOT NULL, UNIQUE(title, genre, release_year));"
    );

    await client.query(
      "CREATE TABLE IF NOT EXISTS artist_album(id SERIAL PRIMARY KEY, artist_id INTEGER REFERENCES artists(id) NOT NULL, album_id INTEGER REFERENCES albums(id) NOT NULL, UNIQUE(artist_id, album_id));"
    );

    await client.query(
      "CREATE TABLE IF NOT EXISTS songs(id SERIAL PRIMARY KEY, title VARCHAR(15) NOT NULL, duration INTEGER NOT NULL, release_date DATE, album_id INTEGER REFERENCES albums(id) NOT NULL, UNIQUE(title, duration, album_id));"
    );

    await client.query(
      "CREATE TABLE IF NOT EXISTS library(id SERIAL PRIMARY KEY, title VARCHAR(15) NOT NULL, album_id INTEGER REFERENCES albums(id), user_id INTEGER REFERENCES users(id) NOT NULL, song_id INTEGER REFERENCES songs(id), UNIQUE( album_id, user_id), UNIQUE( user_id, song_id));"
    );

    // await insertData();

    return;
  } catch (err) {
    return { message: err };
  }
};

const insertData = async () => {
  const usersInsertQuery =
    "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)";
  const artistsInsertQuery =
    "INSERT INTO artists (birth_date, nationality, user_id) VALUES ($1, $2, $3)";
  const albumsInsertQuery =
    "INSERT INTO albums (title, genre, total_tracks, release_year) VALUES ($1, $2, $3, $4)";
  const artist_albumInsertQuery =
    "INSERT INTO artist_album (artist_id, album_id) VALUES ($1, $2)";
  const songsInsertQuery =
    "INSERT INTO songs (title, duration, release_date, album_id) VALUES ($1, $2, $3, $4)";
  const libraryInsertQuery =
    "INSERT INTO library (title, album_id, user_id, song_id) VALUES ($1, $2, $3, $4)";

  const hashed_password = await bcrypt.hash("123456", 12);

  await client.query(usersInsertQuery, [
    "admin",
    null,
    "admin@admin.com",
    hashed_password,
  ]);
  await client.query(usersInsertQuery, [
    "First1",
    "Last1",
    "first1@test.com",
    hashed_password,
  ]);
  await client.query(usersInsertQuery, [
    "First2",
    "Last2",
    "first2@test.com",
    hashed_password,
  ]);
  await client.query(usersInsertQuery, [
    "First3",
    "Last3",
    "first3@test.com",
    hashed_password,
  ]);

  await client.query(artistsInsertQuery, ["1994-10-27", "Bangladeshi", 1]);
  await client.query(artistsInsertQuery, ["1998-10-27", "Bangladeshi", 2]);
  await client.query(artistsInsertQuery, ["2002-10-27", "Bangladeshi", 3]);

  await client.query(albumsInsertQuery, ["Title1", "genre1", 2, 2000]);
  await client.query(albumsInsertQuery, ["Title2", "genre2", 2, 2000]);
  await client.query(albumsInsertQuery, ["Title3", "genre3", 2, 2000]);

  await client.query(artist_albumInsertQuery, [3, 3]);
  await client.query(artist_albumInsertQuery, [1, 2]);
  await client.query(artist_albumInsertQuery, [2, 1]);

  await client.query(songsInsertQuery, ["Title1", 20, "1994-10-27", 3]);
  await client.query(songsInsertQuery, ["Title2", 20, "1994-10-27", 1]);
  await client.query(songsInsertQuery, ["Title3", 20, "1994-10-27", 2]);

  await client.query(libraryInsertQuery, ["Title1", 3, 3, null]);
  await client.query(libraryInsertQuery, ["Title2", 1, 2, null]);
  await client.query(libraryInsertQuery, ["Title3", null, 4, 1]);
  await client.query(libraryInsertQuery, ["Title3", null, 4, 2]);

  return;
};

module.exports = configDataBase;
