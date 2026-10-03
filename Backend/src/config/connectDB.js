import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

async function connectDB(retries = 5, delay = 2000) {
  try {
    const DB_Host = await mongoose.connect(process.env.MONGODB_URI);

    console.log(
      `Database Connected Successfully and the Host is ${DB_Host.connection.host}`,
    );
  } catch (error) {
    console.log("Database Connection Failed", error.message);

    if (retries === 0) {
      console.error(`Exhausted retries. Exiting....`);
      process.exit(1);
    }

    console.log(`Retrying connection is ${delay / 1000} seconds....`);

    setTimeout(() => connectDB(retries - 1, delay), delay);
  }
}

export { connectDB };
