import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

async function connectDB(retries = 5, delay = 1000) {
  try {
    const DB_Host = await mongoose.connect(process.env.MONGODB_URI);

    console.log(
      `Database Connected Successfully and the Host is ${DB_Host.connection.host}`
    );
  } catch (error) {
    if (retries > 0) {
      setTimeout(() => {
        connectDB(retries - 1, delay * 2);
      }, delay);
    } else if (retries === 0) {
      console.log(`Error while connection to the Data Base ${error?.message}`);
      process.exit(1);
    }
  }
}

export { connectDB };
