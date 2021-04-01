# cleanup-mini-css-extract-plugin 🧹

Removes mini-css-extract-plugin output from your webpack compilation stats output.

## How to use

Add the plugin to your `webpack.config.js`:

```js
const CleanupMiniCssExtractPlugin = require("cleanup-mini-css-extract-plugin");

module.exports = {
  plugins: [new CleanupMiniCssExtractPlugin()]
};
```

And breathe! 🍃

## Configuration

The default parameters are:

```js
new CleanupMiniCssExtractPlugin({
  children: true,
  warnings: false
});
```

If either parameter is a function, this will filter the associated key and provide the filtered items in a callback. Here is an example:

```js
new CleanupMiniCssExtractPlugin({
  children: removed => console.log(`removed ${removed.length} children`),
  warnings: removed => console.log(`removed ${removed.length} warning(s)`)
});
```

You could use this to log filtered items to a file, for example.
