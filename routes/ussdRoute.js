import express from "express";
import ussdPost from "../controllers/menu.js";

const router = express.Router();

router.route("/ussd").post(ussdPost);

export default router;
