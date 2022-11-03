import { handler } from "./handler";
import * as core from "@actions/core";

describe('test handler', () => {
  const jsonVariables = `{
    "hello": "Hello LiquidJS",
    "foo": {
      "bar": "Foo Bar"
    }
  }`

  it("success template", () => {
    expect(handler({
      jsonVariables: jsonVariables,
      templateFile: "./example/TEMPLATE.md",
      templateString: "",
      outputFile: "./example/RENDER.md",
      outputStateName: "test-state",
    })).resolves
  })

  it("success template string", () => {
    expect(handler({
      jsonVariables: jsonVariables,
      templateFile: "",
      templateString: "{{ hello }}, {{ foo.bar }}",
      outputFile: "./example/RENDER.md",
      outputStateName: "test-state",
    })).resolves
  })

  it("fail, templateFile and templateString are empty", () => {
    expect(handler({
      jsonVariables: jsonVariables,
      templateFile: "",
      templateString: "",
      outputFile: "./example/RENDER.md",
      outputStateName: "test-state",
    })).rejects.toBe("should have at least 'template-file' or 'template-string' input")
  })

  it("fail, outputFile and outputStateName are empty", () => {
    expect(handler({
      jsonVariables: jsonVariables,
      templateFile: "",
      templateString: "{{ hello }}, {{ foo.bar }}",
      outputFile: "",
      outputStateName: "",
    })).rejects.toBe("should have at least 'output-file' or 'output-state' input")
  })
})
