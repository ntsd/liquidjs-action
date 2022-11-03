import * as fs from "fs";
import { liquidJSRender } from "./render";

interface fileHandlerInput {
  templateFile: string;
  jsonVariables: string;
}

export async function fileHandler(input: fileHandlerInput): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(input.templateFile, "utf8", (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      liquidJSRender(data, input.jsonVariables)
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
  });
}
