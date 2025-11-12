import { verifyJWT } from "../../middleware/auth.js";
import express from "express";

const router = express.Router();

// Only accessible if JWT cookie exists and is valid
router.get("/feed", verifyJWT, (req, res) => {
  res.json({
    message: "Welcome to feed",
    user: req.user, // req.user comes from verifyJWT middleware
  });
});

export default router;
