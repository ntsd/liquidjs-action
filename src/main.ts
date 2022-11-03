import * as core from "@actions/core";
import { handler } from "./handler";

async function run() {
  const jsonVariables = core.getInput("variables", { required: true });

  const templateFile = core.getInput("template-file", { required: false });
  const templateString = core.getInput("template-string", { required: false });

  const outputFile = core.getInput("output-file", { required: false });
  const outputStateName = core.getInput("output-state", { required: false });

  handler({
    jsonVariables,
    templateFile,
    templateString,
    outputFile,
    outputStateName
  })
    .then(() => {
      core.info("liquidjs action run successful")
    })
    .catch(err => {
      core.setFailed(err)
    })
}

run();