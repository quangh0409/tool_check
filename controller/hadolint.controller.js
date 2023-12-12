import { OK, BAD_REQUEST } from "../constant/HttpResponseCode.js";
import { execSync } from "child_process";
import { promisify } from "util";
import * as fs from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const readFileAsync = promisify(fs.readFile);

export async function checkTrivy(content) {
  execSync(`../trivyfile.sh ${content}`, {
    stdio: "inherit",
    shell: "/bin/bash",
  });

  const path = __dirname;

  let filePath;

  filePath = resolve(path, "../..", "trivy.json");

  console.log(
    "?? ~ file: hadolint.controller.js:14 ~ test ~ filePath:",
    filePath
  );

  try {
    // const content = await readFileAsync(filePath, "utf8");

    // const markdownText = content.replace(/\n/g, '  \n');

    const content = await readFileAsync(filePath);
    const jsonData = JSON.parse(content);

    return {
      statusCode: OK,
      data: {
        description: jsonData,
      },
    };
  } catch (err) {
    console.error("Error reading file:", err);

    return {
      statusCode: BAD_REQUEST,
      data: {
        description: "Error reading file",
      },
    };
  }
}

export async function checkHadolint(content) {
  const path = __dirname;

  let filePath;

  filePath = resolve(path, "../..", "Dockerfile");

  fs.writeFileSync(filePath, content);

  execSync(`hadolint Dockerfile --format json | tee ../hadolint.json`, {
    stdio: "inherit",
    shell: "/bin/bash",
  });

  filePath = resolve(path, "../..", "hadolint.json");
  // filePath = resolve(path, "../", "hadolint.json");

  try {
    // const content = await readFileAsync(filePath, "utf8");
    const content = await readFileAsync(filePath);
    const jsonData = JSON.parse(content);
    // const rawData = fs.readFileSync(filePath);

    return {
      statusCode: OK,
      data: {
        description: jsonData,
      },
    };
  } catch (err) {
    return {
      statusCode: BAD_REQUEST,
      data: {
        description: "Error reading file",
      },
    };
  }
}

function convertToMarkdown(inputString) {
  // T�ch chu?i th�nh t?ng ph?n theo d�ng
  const lines = inputString.trim().split("\n");
  let markdown = "";

  // Chuy?n d?i ti�u d? v� b?ng
  lines.forEach((line) => {
    if (
      line.startsWith("+") ||
      line.startsWith("+") ||
      line.startsWith("+") ||
      line.startsWith("|")
    ) {
      // X? l� d�ng b?ng
      const cells = line.split("|").map((cell) => cell.trim());
      cells.shift();
      cells.pop();

      if (cells.length > 0) {
        if (markdown === "") {
          // X? l� d�ng ti�u d? c?a b?ng
          markdown += "| " + cells.join(" | ") + " |\n";
          markdown += "| " + cells.map(() => "---").join(" | ") + " |\n";
        } else {
          // X? l� d�ng d? li?u c?a b?ng
          markdown += "| " + cells.join(" | ") + " |\n";
        }
      }
    } else {
      // X? l� c�c d�ng kh�c
      markdown += line + "\n";
    }
  });

  return markdown;
}
