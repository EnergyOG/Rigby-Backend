import { connect } from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import loginRoute from "./router/auth/login.route.js";
import registerRoute from "./router/auth/register.route.js";
import logoutRoute from "./router/auth/logout.route.js";
import verifyUserRoute from "./router/auth/verify.route.js"
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.set("trust proxy", 1);

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://rigby-frontend-deployment.onrender.com"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(helmet());

app.use("/api/auth", loginRoute, registerRoute, logoutRoute, verifyUserRoute);


connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });