import { fileHandler } from "./file";

describe('test fileHandler', () => {
  const jsonVariables = `{
    "hello": "Hello LiquidJS",
    "foo": {
      "bar": "Foo Bar"
    }
  }`

  it("success", () => {
    expect(fileHandler({
      templateFile: "./example/TEMPLATE.md",
      jsonVariables: jsonVariables,
    })).resolves.toBe("Hello LiquidJS, Foo Bar");
  })

  it("fail, json parser error", () => {
    expect(fileHandler({
      templateFile: "./example/TEMPLATE.md",
      jsonVariables: `{'hello': 'Hello LiquidJS'}`,
    })).rejects.toThrowError("Unexpected token ' in JSON at position 1")
  })

  it("fail, template not found", () => {
    expect(fileHandler({
      templateFile: "./example/TEMPLATE_NOT_FOUND.md",
      jsonVariables: jsonVariables,
    })).rejects.toThrowError("ENOENT: no such file or directory, open './example/TEMPLATE_NOT_FOUND.md'")
  })
})
