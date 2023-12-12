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

  execSync(`../trivyfile.sh ${content}`, { stdio: 'inherit',shell: '/bin/bash' });

  const path = __dirname;

  let filePath;

  filePath = resolve(path, "../..", "trivy.txt");

  console.log("?? ~ file: hadolint.controller.js:14 ~ test ~ filePath:", filePath);

  try {
    const content = await readFileAsync(filePath, "utf8");
    
    // const markdownText = content.replace(/\n/g, '  \n');
    
    const result = convertToMarkdown(content);

    return {
      statusCode: OK,
      data: {
        description: result,
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

  console.log("?? ~ file: hadolint.controller.js:14 ~ test ~ filePath:", filePath);
  
  execSync(`hadolint Dockerfile | tee ../hadolint.txt`, { stdio: 'inherit',shell: '/bin/bash' });
  
  filePath = resolve(path, "../..", "hadolint.txt");

  try {
    const content = await readFileAsync(filePath, "utf8");

    return {
      statusCode: OK,
      data: {
        description: content,
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
    // Tách chu?i thành t?ng ph?n theo dòng
    const lines = inputString.trim().split('\n');
    let markdown = '';

    // Chuy?n d?i tiêu d? và b?ng
    lines.forEach(line => {
        if (line.startsWith('+') || line.startsWith('+') || line.startsWith('+') || line.startsWith('|')) {
            // X? lý dòng b?ng
            const cells = line.split('|').map(cell => cell.trim());
            cells.shift();
            cells.pop();

            if (cells.length > 0) {
                if (markdown === '') {
                    // X? lý dòng tiêu d? c?a b?ng
                    markdown += '| ' + cells.join(' | ') + ' |\n';
                    markdown += '| ' + cells.map(() => '---').join(' | ') + ' |\n';
                } else {
                    // X? lý dòng d? li?u c?a b?ng
                    markdown += '| ' + cells.join(' | ') + ' |\n';
                }
            }
        } else {
            // X? lý các dòng khác
            markdown += line + '\n';
        }
    });

    return markdown;
}