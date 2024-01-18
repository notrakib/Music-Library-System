const client = require("../utils/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signUpUser = async function (data) {
  try {
    const { first_name, last_name, email, password } = data;

    const hashed_password = await bcrypt.hash(password, 12);

    const result = await client.query(
      "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
      [first_name, last_name, email, hashed_password]
    );

    return result;
  } catch (err) {
    throw new Error(err);
  }
};

exports.signInUser = async function (data) {
  try {
    const { email, password } = data;

    const findUser = await client.query(
      "SELECT * FROM users WHERE email= $1",
      [email]
    );

    const user_isExist = findUser.rows[0];

    if (!user_isExist) {
      throw new Error("User doesnot exist");
    }

    const password_isMatched = await bcrypt.compare(
      password,
      user_isExist.password
    );

    if (!password_isMatched) {
      throw new Error("Invalid password");
    }

    const payload = { user: user_isExist };

    const token = jwt.sign(payload, process.env.TOKEN_SECRET);

    return token;
  } catch (err) {
    throw new Error(err);
  }
};
