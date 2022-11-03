import { liquidJSRender } from "./render";

describe("test liquid js render", () => {
  const template = `{{ hello }}, {{ foo.bar }}`;
  const jsonVariables = `{
        "hello": "Hello LiquidJS",
        "foo": {
        "bar": "Foo Bar"
        }
    }`;

  it("success", () => {
    expect(liquidJSRender(template, jsonVariables)).resolves.toBe(
      "Hello LiquidJS, Foo Bar"
    );
  });

  it("fail, json parser error", () => {
    expect(
      liquidJSRender(template, `{'hello': 'Hello LiquidJS'}`)
    ).rejects.toThrowError("Unexpected token ' in JSON at position 1");
  });
});
