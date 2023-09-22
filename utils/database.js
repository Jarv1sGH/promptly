import mongoose from "mongoose";

let isConnected = false;

export const connectToDataBase = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log(" already connected");
    return;
  }
  try {
    await mongoose.connect(process.env.DB_URI, {
      dbName: "Promptly",
      useNewUrlParser: true,
      useUnifiedTopology: true,
      family: 4
    });

    isConnected = true;
    console.log("connected to database");
  } catch (error) {
    console.error(error);
  }
};
