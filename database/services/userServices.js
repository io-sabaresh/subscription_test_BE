"use script";
const User = require("../models/Users");

const createSuperAdmin = async () => {
  try {
    return await User.findOneAndUpdate(
      { email: "io.sabaresh@gmail.com" },
      {
        firstName: "SuperAdmin",
        lastName: "Sabaresh",
        email: "io.sabaresh@gmail.com",
        password: "sabareshRaja11",
        userType: "super-admin",
      },
      {
        upsert: true,
      }
    );
  } catch (error) {
    throw error;
  }
};

const getUserByEmail = async (email) => {
  try {
    return await User.findOne({ email: email.trim().toLowerCase() }).lean().exec();
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createSuperAdmin,
  getUserByEmail
};
