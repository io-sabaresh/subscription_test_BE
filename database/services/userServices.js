"use script";
const User = require("../models/Users");
const { DEFAULT_SUPER_ADMIN,
  DEFAULT_SUPER_ADMIN_PASSWORD } = require("../../constants");

const createSuperAdmin = async () => {
  try {
    return await User.findOneAndUpdate(
      { email: DEFAULT_SUPER_ADMIN },
      {
        firstName: "SuperAdmin",
        lastName: "Sabaresh",
        email: DEFAULT_SUPER_ADMIN,
        password: DEFAULT_SUPER_ADMIN_PASSWORD,
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

const createNewUser = async (newUser) => {
  try {
    return await User.create(newUser);
  } catch (error) {
    throw error;
  }
}

const getUserByEmail = async (email, select = "") => {
  try {
    return await User.findOne({ email: email.trim().toLowerCase() }).select(select).lean().exec();
  } catch (error) {
    throw error;
  }
};

const updateUserByEmail = async (email, updates) => {
  try {
    return await User.findOneAndUpdate(email, updates, { new: true });
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createSuperAdmin,
  createNewUser,
  getUserByEmail,
  updateUserByEmail
};
