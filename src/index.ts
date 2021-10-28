import { Compiler, Stats, WebpackError } from "webpack";

type TOption = boolean;
type TRemovedChildren = Stats["compilation"][];
type TRemovedWarnings = WebpackError[];
type TRemovedChildrenCallback = (removedChildren: TRemovedChildren) => void;
type TRemovedWarningsCallback = (removedWarnings: TRemovedWarnings) => void;

type TOptions = {
  children: TOption | TRemovedChildrenCallback;
  warnings: TOption | TRemovedWarningsCallback;
};

const DEFAULT_OPTIONS: TOptions = { children: true, warnings: false };

class CleanupMiniCssExtractPlugin {
  private _children: TOptions["children"];
  private _warnings: TOptions["warnings"];

  constructor(options = DEFAULT_OPTIONS) {
    this._children = options.children || DEFAULT_OPTIONS.children;
    this._warnings = options.warnings || DEFAULT_OPTIONS.warnings;
  }

  apply(compiler: Compiler) {
    compiler.hooks.done.tap("CleanupMiniCssExtractPlugin", stats => {
      if (this._children) {
        const children = stats.compilation.children;
        const removedChildren: TRemovedChildren = [];
        if (Array.isArray(children)) {
          stats.compilation.children = children.filter(child => {
            if (child.name?.indexOf("mini-css-extract-plugin") == -1) {
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
        const removedWarnings: TRemovedWarnings = [];
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
