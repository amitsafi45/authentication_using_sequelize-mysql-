import controller from "../controller/controller.js";
import express from "express";

const router = express.Router();
router.post("/register", controller.insert);
router.get("/login", controller.login);
export default router;
