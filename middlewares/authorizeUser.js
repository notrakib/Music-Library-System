const client = require("../utils/database");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const bearerHeader = req.header("authorization");

    if (!bearerHeader) {
      throw new Error("No token is provided");
    }

    const verified = await jwt.verify(
      bearerHeader,
      process.env.TOKEN_SECRET
    );
    
    if (verified) {
      res.locals.user = verified;
      const findUser = await client.query("SELECT * FROM users WHERE id= $1", [
        verified.user.id,
      ]);

      const user_isExist = findUser.rows[0];

      if (!user_isExist) {
        throw new Error("You are not authorized to access this resource");
      }
      next();
    } else {
      throw new Error("Invalid token");
    }
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};
