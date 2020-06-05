const mongoose = require("mongoose");
const { createSuperAdmin } = require("../database/services/userServices");

exports.mongoDBConfig = async () => {
  try {
    await mongoose.connect(
      "",
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
