import { OK } from "../constant/HttpResponseCode.js";

export async function test() {
  let ret = {
    statusCode: OK,
    data: {
      description: "First ok!",
    },
  };
  
  execSync(`trivy image vutrongquang/mail:latest > result.xlsx`, { stdio: 'inherit' });

  return ret;
}
