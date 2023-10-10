const mongoose = require("mongoose");

require("dotenv").config();

const connectiondb = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.MONGODB, {
      UseUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`Mongodb Connected : ${conn}`);
  } catch (error) {
    console.error(`Error ${error.message}`);
    process.exit();
  }
};

module.exports = connectiondb;
