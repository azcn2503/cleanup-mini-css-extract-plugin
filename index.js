const DEFAULT_OPTIONS = { children: true, warnings: false };

const getOptionValue = (options, key) =>
  options[key] !== undefined ? options[key] : DEFAULT_OPTIONS[key];

class CleanupMiniCssExtractPlugin {
  constructor(options = DEFAULT_OPTIONS) {
    this._children = getOptionValue(options, "children");
    this._warnings = getOptionValue(options, "warnings");
  }

  apply(compiler) {
    compiler.hooks.done.tap("CleanupMiniCssExtractPlugin", stats => {
      if (this._children) {
        const children = stats.compilation.children;
        const removedChildren = [];
        if (Array.isArray(children)) {
          stats.compilation.children = children.filter(child => {
            if (child.name.indexOf("mini-css-extract-plugin") == -1) {
              return true;
            } else {
              removedChildren.push(child);
              return false;
            }
          });
          if (typeof this._children === "function") {
            this._children(removedChildren);
          }
        }
      }

      if (this._warnings) {
        const warnings = stats.compilation.warnings;
        const removedWarnings = [];
        if (Array.isArray(warnings)) {
          stats.compilation.warnings = warnings.filter(warning => {
            if (warning.message.indexOf("[mini-css-extract-plugin]") === -1) {
              return true;
            } else {
              removedWarnings.push(warning);
              return false;
            }
          });
          if (typeof this._warnings === "function") {
            this._warnings(removedWarnings);
          }
        }
      }
    });
  }
}

module.exports = CleanupMiniCssExtractPlugin;
