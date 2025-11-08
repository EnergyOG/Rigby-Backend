import { connect } from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import loginRoute from "./router/auth/login.route.js";
import registerRoute from "./router/auth/register.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/api/auth", loginRoute);
app.use("/api/auth", registerRoute);

connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
  });
