import { OK } from "../constant/HttpResponseCode.js";

export async function test() {
  let ret = {
    statusCode: OK,
    data: {
      description: "First ok!",
    },
  };

  return ret;
}
