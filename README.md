# html-webpack-plugin-django

A template for Typescript projects

## At a glance

[![Node.js CI](https://github.com/TommasoAmici/html-webpack-plugin-django/actions/workflows/build.yml/badge.svg)](https://github.com/TommasoAmici/html-webpack-plugin-django/actions/workflows/build.yml) [![codecov](https://codecov.io/gh/TommasoAmici/html-webpack-plugin-django/branch/main/graph/badge.svg?token=KYeOxoHseJ)](https://codecov.io/gh/TommasoAmici/html-webpack-plugin-django) <img src="https://img.shields.io/bundlephobia/minzip/html-webpack-plugin-django"> <img src="https://img.shields.io/npm/v/html-webpack-plugin-django">

## Getting started

First, install the package

```sh
# npm install -D html-webpack-plugin-django
yarn add -D html-webpack-plugin-django
```

In your `webpack.config.js` file add the plugin after `html-webpack-plugin`.
`html-webpack-plugin-django` will output Django static tags in the head and body of your HTML index file.

This plugin operates under a few assumptions:

1. You have added the `{% load static %}` tag to your HTML template
2. Your webpack bundle is emitted in one of your [Django project's static files directories](https://docs.djangoproject.com/en/3.2/howto/static-files/).

**Example**

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackPluginDjango = require("html-webpack-plugin-django");

module.exports = (env, argv) => {
  return {
    output: {
      path: path.resolve("path/to/your/django/static/dist"),
      filename: "js/[name].[contenthash].js",
      publicPath: "/static/",
    },
    ...
    plugins: [
      new HtmlWebpackPlugin(),
      new HtmlWebpackPluginDjango({ bundlePath: "dist" }),
    ],
  };
};
```

**Output**

```html
<script defer src="{% static 'dist/js/runtime.1198543abbf33da21374.js' %}"></script>
```

## Found a bug?

Please file a report in [this repository's issues](https://github.com/TommasoAmici/html-webpack-plugin-django/issues)

## Development

If you want to contribute to this project, that's great to hear!

You can start at [CONTRIBUTING.md](./CONTRIBUTING.md).

## To do

- Add integration test with Webpack and `html-webpack-plugin`
