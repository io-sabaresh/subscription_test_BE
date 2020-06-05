const mongoose = require("mongoose");
const { createSuperAdmin } = require("../database/services/userServices");
const { MONGO_CONNECTING_STRING } = require("../constants");
exports.mongoDBConfig = async () => {
  try {
    await mongoose.connect(
      MONGO_CONNECTING_STRING,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify : false,
        useCreateIndex: true,
      }
    );
    console.log(`MongoDB Connected`);
    await createSuperAdmin();
    return;
  } catch (error) {
    console.log(`MongoDB Connection Failed: ${error}`);
  }
};
