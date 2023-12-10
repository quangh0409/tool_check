import express from "express";
import { test } from "../controller/hadolint.controller.js";

const router = express.Router();

router.get("/", async (req, _, next) => {
  let { id, roles, email } = req.payload;
  const result = await test();
  next(result);
});

export default router;
