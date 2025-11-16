import express from "express";
import {verifyUser} from "../../controller/auth/verify.controller.js";

const router = express.Router();

router.get("/verify", verifyUser);

export default router;