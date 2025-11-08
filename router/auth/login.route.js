import LoginController from "../../controller/auth/login.controller.js";
import express from "express";

const router = express.Router();

router.post("/login", LoginController.userLogin);

export default router;