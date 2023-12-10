import { UNAUTHOTIZED } from "../constant/HttpResponseCode.js";
import jsonwebtoken from "jsonwebtoken";
import { publicKEY } from "../ConfigKey.js";

export function validateTokenStaffAccess(req, res, next) {
  let { token } = req.headers;
  if (!token) {
    return next({
      statusCode: UNAUTHOTIZED,
      error: "NO_TOKEN",
      description: "Không có Token",
    });
  }
  let verifyOptions = {
    algorithm: "RS256",
  };
  try {
    let payload = jsonwebtoken.verify(token, publicKEY, verifyOptions);
    req.payload = {
      id: payload.id,
      email: payload.id,
      roles: payload.id,
    };
    // myLogger.info('Request.payload: %o', token);
    let { type } = payload;

    // myLogger.info("tenants: %o", tenants)
    if (type !== "ACCESS_TOKEN") {
      return next({
        statusCode: UNAUTHOTIZED,
        error: "WRONG_TOKEN",
        description: "Wrong token type",
      });
    }
    return next();
  } catch (e) {
    return next({
      statusCode: UNAUTHOTIZED,
      error: "TOKEN_EXPIRED",
      description: "Token hết hạn",
    });
  }
}

export function validateToken2FA(req, res, next) {
  let { token } = req.headers;
  if (!token) {
    return next({
      statusCode: UNAUTHOTIZED,
      error: "NO_TOKEN",
      description: "Không có Token",
    });
  }
  let verifyOptions = {
    algorithm: "RS256",
  };
  try {
    let payload = jsonwebtoken.verify(token, publicKEY, verifyOptions);
    req.payload = payload;
    let { type } = payload;
    if (type !== "2FA_TOKEN") {
      return next({
        statusCode: UNAUTHOTIZED,
        error: "WRONG_TOKEN",
        description: "Wrong token type",
      });
    }
    return next();
  } catch (e) {
    return next({
      statusCode: UNAUTHOTIZED,
      error: "TOKEN_EXPIRED",
      description: "Token hết hạn",
    });
  }
}
