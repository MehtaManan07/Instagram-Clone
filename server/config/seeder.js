const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });


const User = require("../models/UserModel")
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
},() => console.log(`db connected`));

// Read json file

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/users.json`, "utf-8")
);

// import to db
const importData = async () => {
  try {
    await User.create(users);
    console.log("Data imported".bgGreen);
    process.exit(0)
  } catch (error) {
    console.error("Error:\n", error);
    process.exit(1)
  }
};

// delete from db
const deleteData = async () => {
  try {
    await User.deleteMany();
    console.log("Data deleted".bgRed);
    process.exit(0)
  } catch (error) {
    console.error("Error:\n", error);
    process.exit(1)
  }
};

if(process.argv[2] === "-i") {
    importData()
} else if(process.argv[2] === "-d") {
    deleteData()
}