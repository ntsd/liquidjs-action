import * as core from "@actions/core";
import * as fs from "fs";
import { fileHandler } from "./file";
import { liquidJSRender } from "./render";

interface HandlerInput {
  jsonVariables: string;
  templateFile: string;
  templateString: string;
  outputFile: string;
  outputName: string;
}

export async function handler(input: HandlerInput): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    if (input.templateFile == "" && input.templateString == "") {
      reject("should have at least 'template-file' or 'template-string' input");
      return;
    }

    if (input.templateFile != "") {
      fileHandler({
        templateFile: input.templateFile,
        jsonVariables: input.jsonVariables,
      })
        .then((result) => {
          core.info(`successful render template file '${input.templateFile}'`);
          handleResult(result, input.outputFile, input.outputName);
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
      return;
    }

    liquidJSRender(input.templateString, input.jsonVariables)
      .then((result) => {
        core.info("successful render template string");
        handleResult(result, input.outputFile, input.outputName);
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function handleResult(result: string, outputFile: string, outputName: string) {
  if (outputFile != "") {
    fs.writeFileSync(outputFile, result);
  }

  if (outputName != "") {
    core.setOutput(outputName, result);
    core.info(`set output to state name '${outputName}'`);
  }
}
