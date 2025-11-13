import { connect } from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import loginRoute from "./router/auth/login.route.js";
import registerRoute from "./router/auth/register.route.js";
import cookieParser from "cookie-parser";

dotenv.config();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://rigby-frontend.onrender.com"
];

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("CORS not allowed for this origin"), false);
      }
    },
    credentials: true,
  })
);
app.use(helmet());

app.use("/api/auth", loginRoute);
app.use("/api/auth", registerRoute);

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
