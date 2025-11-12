import LoginController from "../../controller/auth/login.controller.js";
import Authentication from "../../middleware/auth.js"
import express from "express";

const router = express.Router();

router.post("/login", Authentication (next),LoginController.userLogin);

export default router;