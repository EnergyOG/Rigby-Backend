import { connect } from "mongoose";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import loginRoute from "./router/auth/login.route.js";
import registerRoute from "./router/auth/register.route.js";
import logoutRoute from "./router/auth/logout.route.js";
import verifyUserRoute from "./router/auth/verify.route.js"
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env.development";
dotenv.config({ path: envFile });


const app = express();
const port = process.env.NODE_ENV === "production" ? process.env.PROD_PORT : process.env.DEV_PORT;

app.use(
  cors()
);

app.use(express.json());
app.use(cookieParser());
app.use(helmet());

app.use("/api/auth", loginRoute, registerRoute, logoutRoute, verifyUserRoute);


connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`🚀 Server running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });