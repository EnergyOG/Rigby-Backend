import RegisterController from "../../controller/auth/register.controller.js";
import express from "express";

const router = express.Router();

router.post("/register", RegisterController.userRegister);

export default router;