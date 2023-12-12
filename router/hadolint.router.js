import express from "express";
import { checkHadolint, checkTrivy } from "../controller/hadolint.controller.js";

const router = express.Router();

router.post("/trivy", async (req, _, next) => {
  //let { id, roles, email } = req.payload;
  const content = req.body.content;
  const result = await checkTrivy(content);
  next(result);
});

router.post("/hadolint", async (req, _, next) => {
  const content = req.body.content;
  const result = await checkHadolint(content);
  next(result);
});

export default router;
