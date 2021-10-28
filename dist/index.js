"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DEFAULT_OPTIONS = { children: true, warnings: false };
var CleanupMiniCssExtractPlugin = /** @class */ (function () {
    function CleanupMiniCssExtractPlugin(options) {
        if (options === void 0) { options = DEFAULT_OPTIONS; }
        this._children = options.children || DEFAULT_OPTIONS.children;
        this._warnings = options.warnings || DEFAULT_OPTIONS.warnings;
    }
    CleanupMiniCssExtractPlugin.prototype.apply = function (compiler) {
        var _this = this;
        compiler.hooks.done.tap("CleanupMiniCssExtractPlugin", function (stats) {
            if (_this._children) {
                var children = stats.compilation.children;
                var removedChildren_1 = [];
                if (Array.isArray(children)) {
                    stats.compilation.children = children.filter(function (child) {
                        var _a;
                        if (((_a = child.name) === null || _a === void 0 ? void 0 : _a.indexOf("mini-css-extract-plugin")) == -1) {
                            return true;
                        }
                        else {
                            removedChildren_1.push(child);
                            return false;
                        }
                    });
                    if (typeof _this._children === "function") {
                        _this._children(removedChildren_1);
                    }
                }
            }
            if (_this._warnings) {
                var warnings = stats.compilation.warnings;
                var removedWarnings_1 = [];
                if (Array.isArray(warnings)) {
                    stats.compilation.warnings = warnings.filter(function (warning) {
                        if (warning.message.indexOf("[mini-css-extract-plugin]") === -1) {
                            return true;
                        }
                        else {
                            removedWarnings_1.push(warning);
                            return false;
                        }
                    });
                    if (typeof _this._warnings === "function") {
                        _this._warnings(removedWarnings_1);
                    }
                }
            }
        });
    };
    return CleanupMiniCssExtractPlugin;
}());
module.exports = CleanupMiniCssExtractPlugin;
