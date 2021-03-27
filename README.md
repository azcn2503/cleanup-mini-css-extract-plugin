# cleanup-mini-css-extract-plugin 🧹

Removes mini-css-extract-plugin output from your webpack compilation stats output.

## How to use

```js
plugins: [
  // other plugins
  new CleanupMiniCssExtractPlugin({
    children: true, // defaults to `true`
    warnings: true // defaults to `false`
  })
  // other plugins
];
```

And breathe! 🍃
