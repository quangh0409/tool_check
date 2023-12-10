import fs from "fs";
export const publicKEY = fs.readFileSync("./config/public.key", "utf8");
