import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import ussdRoute from "./routes/ussdRoute.js";
import UssdMenu from "ussd-builder";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();

const PORT = 9000;

app.post("/ussd", ussdRoute);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
  })
  .catch((err) => console.log(err));
