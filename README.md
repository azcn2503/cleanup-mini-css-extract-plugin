# cleanup-mini-css-extract-plugin 🧹

Removes mini-css-extract-plugin output from your webpack compilation stats output.

## How to use

Add the plugin to your `webpack.config.js`:

```js
const CleanupMiniCssExtractPlugin = require("cleanup-mini-css-extract-plugin");

module.exports = {
  plugins: [
    new CleanupMiniCssExtractPlugin({
      // Remove all output from stats.compilation.children if set to true.
      // This is where most of the log spam comes from.
      // Default: true
      children: true,

      // Also remove warnings from stats.compilation.warnings if set to true.
      // These may or may not be useful for you.
      // Default: false
      warnings: true
    })
  ];
};
```

And breathe! 🍃
