import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";
import app from "./app";

dotenv.config({ path: "./config.env" });

// DATABASE CONNECT
const DB = process.env.DATABASE;
const PASSWORD = process.env.DATABASE_PASSWORD || "";
const connect = DB?.replace("<password>", PASSWORD);
mongoose
  .connect(
    connect as string,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions
  )
  .then(() => {
    console.log("DB connect success");
  });

// SERVER CONNECT
app.listen(process.env.PORT, () => {
  console.log("App running");
});
