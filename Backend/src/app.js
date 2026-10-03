import express from "express";
import cors from "cors";


const app = express();

//This is used for cross origin resource sharing so that the client can make a request to the server and get the data it doesn't get blocked by the server
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

//This is used to parse the request body which is in json format
app.use(express.json());

//This is used to parse the request body which is in urlencoded format. Ex: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

export default app;
