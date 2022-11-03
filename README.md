# LiquidJS Github Action

Name: `liquidjs-action`

Github Action to render LiquidJS.

## Template

This action required a template file which it's required input `template-file` or `template-string`. The template  will render by [LiquidJS](https://liquidjs.com/).
You can find the example template file [here](https://github.com/ntsd/liquidjs-action/blob/master/example/TEMPLATE.md).
The template file will render to required input `output-file`.

## Inputs

`variables` - The JSON variables to render.. `required`.

`template-string` - The template string to render. `optional`.

`template-file` - The file template to render. `optional`.

`output-file` - The rendered out put file. `optional`.

`output-state` - The output state name for the result. `optional`.

## Examples

### Simple

```yml
name: Generate Github Profile
on: push

jobs:
  liquidjs-job:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: LiquidJS Action
        uses: ntsd/liquidjs-action@master
        with:
          template-file: "./README.TEMPLATE.md"
          output-file: "./README.md"
          variables: `{"hello": "Hello LiquidJS"}`
      - name: Commit files
        run: |
          git config --local user.email "ntsd@users.noreply.github.com"
          git config --local user.name "ntsd"
          git commit -am "docs: auto update README.md"
          git push
```
