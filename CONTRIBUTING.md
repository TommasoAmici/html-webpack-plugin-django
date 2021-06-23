# Development

## Install all the dependencies

```sh
yarn
```

When running this command, a pre-commit git hook will be locally installed with
[husky](https://github.com/typicode/husky) and it will run
[lint-staged](https://github.com/okonet/lint-staged) before every commit.

See `"lint-staged"` in [package.json](./package.json) for more information.

## Build the project

```sh
yarn build
```

## Link the package to test locally

```sh
yarn link
# then if your project is in the same directory as this one
cd /path/to/your/project
yarn link ../typescript-template
```

## Other commands

```sh
# run the entire test suite
yarn test
# format the source code
yarn format
```
