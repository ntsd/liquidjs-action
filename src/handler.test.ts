import { handler } from "./handler";
import * as core from "@actions/core";

describe("test handler", () => {
  const jsonVariables = `{
    "hello": "Hello LiquidJS",
    "foo": {
      "bar": "Foo Bar"
    }
  }`;

  it("success template", () => {
    expect(
      handler({
        jsonVariables: jsonVariables,
        templateFile: "./example/TEMPLATE.md",
        templateString: "",
        outputFile: "./example/RENDER.md",
        outputName: "test-state",
      })
    ).resolves;
  });

  it("success template string", () => {
    expect(
      handler({
        jsonVariables: jsonVariables,
        templateFile: "",
        templateString: "{{ hello }}, {{ foo.bar }}",
        outputFile: "./example/RENDER.md",
        outputName: "test-state",
      })
    ).resolves;
  });

  it("fail, templateFile and templateString are empty", () => {
    expect(
      handler({
        jsonVariables: jsonVariables,
        templateFile: "",
        templateString: "",
        outputFile: "./example/RENDER.md",
        outputName: "test-state",
      })
    ).rejects.toBe(
      "should have at least 'template-file' or 'template-string' input"
    );
  });

  it("fail, outputFile and outputName are empty", () => {
    expect(
      handler({
        jsonVariables: jsonVariables,
        templateFile: "",
        templateString: "{{ hello }}, {{ foo.bar }}",
        outputFile: "",
        outputName: "",
      })
    ).rejects.toBe("should have at least 'output-file' or 'output-name' input");
  });
});
