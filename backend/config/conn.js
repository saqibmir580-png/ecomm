const mongoose = require("mongoose");

const DBconn = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log(`mongodb is connected`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = DBconn;
