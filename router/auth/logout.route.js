import express from "express";
import { logout } from "../../controller/auth/logout.controller.js";

const router = express.Router();

router.get("/logout", logout);

export default router;