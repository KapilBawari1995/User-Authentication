import mongoose from "mongoose";

const Db_CONTIONE = async () => {
  try {
    console.log("ENV =", process.env.MONGODB_URL);

    const connection = await mongoose.connect(process.env.MONGODB_URL);

    console.log("MongoDB Connected:", connection.connection.host);
  } catch (error) {
    console.log("MongoDB Error:", error);
    process.exit(1);
  }
};

export default Db_CONTIONE;