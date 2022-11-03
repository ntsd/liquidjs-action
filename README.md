# LiquidJS Github Action

Name: `liquidjs-action`

Github Action to render LiquidJS.

## Inputs

`variables` - The JSON variables to render.. `required`.

`template-string` - The template string to render. `optional`.

`template-file` - The file template to render. `optional`.

`output-file` - The rendered out put file. `optional`.

`output-name` - The output state name for the result. `optional`.

## Template

This action required template file or template string from input `template-file` or `template-string`. The template  will render by [LiquidJS](https://liquidjs.com/).
You can find the example template file [here](https://github.com/ntsd/liquidjs-action/blob/master/example/TEMPLATE.md).
The template file will render to file input `output-file` or [Github Action Output](https://docs.github.com/en/github-ae@latest/actions/using-workflows/workflow-commands-for-github-actions#using-workflow-commands-to-access-toolkit-functions) name from input `output-name`.

## Examples

### File render

```yml
name: Render LiquidJS
on: push

jobs:
  liquidjs-job:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: LiquidJS Action
        uses: ntsd/liquidjs-action@master
        with:
          variables: `{"hello": "Hello LiquidJS"}`
          template-string: "{{ hello }}"
          output-file: "./RENDER.md"
      - name: Commit files
        run: |
          git config --local user.email "ntsd@users.noreply.github.com"
          git config --local user.name "ntsd"
          git commit -am "docs: auto update RENDER.md"
          git push
```

### Github Action Output render

```yml
name: Render LiquidJS
on: push

jobs:
  liquidjs-job:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: LiquidJS Action
        id: run-liquidjs
        uses: ntsd/liquidjs-action@master
        with:
          variables: `{"hello": "Hello LiquidJS"}`
          template-string: "{{ hello }}"
          output-name: "rendered-result"
      - name: Echo output
        run: echo "The rendered result is '${{ steps.run-liquidjs.outputs.rendered-result }}'"
```