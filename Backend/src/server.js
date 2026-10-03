import app from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./config/connectDB.js";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 8002;

try {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} catch (error) {
  console.log(`Error while connection to the Data Base ${error?.message}`);
  process.exit(1);
}
