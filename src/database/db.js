import mongoose from "mongoose";

const URL =
  "mongodb+srv://dinesh:ZBQybaZwEyiqFx5m@cluster0.mxllvuq.mongodb.net/Blogweb";
const connectDb = async () => {
  try {
    await mongoose.connect(URL, { autoIndex: true });
    console.log("database is conneted");
  } catch (error) {
    console.error("database connection failed");
  }
};
export default connectDb;
