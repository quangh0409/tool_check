import express, { urlencoded } from "express";
// import mongoose from "mongoose";
import myLogger from "./winstonLog/winston.js";
import dotenv from "dotenv";
import cors from "cors";

import hadolintRouter from "./router/hadolint.router.js";

import {
  BAD_REQUEST,
  CREATED,
  NO_CONTENT,
  OK,
} from "./constant/HttpResponseCode.js";
import cookieParser from "cookie-parser";
import { validateTokenStaffAccess } from "./token/ValidateToken.js";
import { makeInfo } from "./validation/MakeLog.js";
import Sanitization from "./middleware/Sanitization.js";

dotenv.config();
const app = express();
app.use(cors());

app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(Sanitization);

//app.use(
//  "/api/v1/in/tool-checks",
//  makeInfo,
//  validateTokenStaffAccess,
//  hadolintRouter
//);

app.use(
  "/api/v1/in/tool-checks",
  makeInfo,
//  validateTokenStaffAccess,
  hadolintRouter
);

app.use((data, req, res, next) => {
  let statusCode = data.statusCode;
  if (
    statusCode !== OK &&
    statusCode !== CREATED &&
    statusCode !== NO_CONTENT
  ) {
    res.status(statusCode || BAD_REQUEST).send({
      code: statusCode,
      error: data.data ? data.data : data.error,
      description: data.description,
    });
  } else {
    myLogger.info(
      "%o",
      { status_code: statusCode, body: data.data },
      { label: "RESPONSE" }
    );
    res.status(statusCode).send(data.data);
  }
});

// const dburl = `mongodb://${user}:${pass}@${host}:${port}/${dbname}?serverSelectionTimeoutMS=5000&connectTimeoutMS=10000&authSource=${dbname}&authMechanism=SCRAM-SHA-256`
// mongoose.connect(dburl,
//     { useNewUrlParser: true, useUnifiedTopology: true },
//     (err) => {
//         if (err) {
//             myLogger.info("%o", err)
//         } else {
//             // logging("soc", {Ok: "htt"})
//             myLogger.info("OK")
//         }
//     })
//  publicMobile();

const portNode = process.env.CA_TOOL_CHECK_PORT_NUMBER || 3000;
const host_node = process.env.CA_TOOL_CHECK_HOST_NAME || "0.0.0.0";
function myListener() {
  myLogger.info(`Listening on port ${portNode}..`);
}
app.listen(portNode, host_node, myListener);
