import express from "express";
import dotnet from "dotnet";
import postController from "../../controller/components/post.controller.js";

dotnet.config();
const router = express.Router();

router.post("/", postController )
