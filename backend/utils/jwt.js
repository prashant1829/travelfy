const jwt = require("jsonwebtoken");
require("dotenv").config(); // Ensure environment variables are loaded

// Create a JWT
exports.createJWT = (user) => {
  if (!process.env.SECRET) {
    throw new Error("SECRET environment variable is not defined");
  }

  return jwt
    .sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.SECRET,
      { expiresIn: "24h" }
    )
    .split(".");
};

// Clean the response data
exports.clearRes = (data) => {
  const { password, __v, updatedAt, ...cleanedData } = data;
  return cleanedData;
};

