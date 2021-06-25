import { default as HtmlWebpackPluginInstance } from "html-webpack-plugin";
import path from "path";
import { Compiler, WebpackPluginInstance } from "webpack";

interface IPluginOptions {
  bundlePath: string;
}

class HtmlWebpackPluginDjango implements WebpackPluginInstance {
  options: IPluginOptions;

  constructor(options?: IPluginOptions) {
    const userOptions = options || {};
    const defaultOptions = {
      bundlePath: "",
    };
    this.options = Object.assign(defaultOptions, userOptions);
  }

  /**
   * Extract HTMLWebpack Plugin by jahed
   * https://github.com/principalstudio/html-webpack-inject-preload/blob/master/src/main.ts#L65
   * @param compiler
   */
  extractHtmlWebpackPluginModule = (
    compiler: Compiler
  ): typeof HtmlWebpackPluginInstance | null => {
    const htmlWebpackPlugin = compiler.options.plugins.find(
      plugin => plugin.constructor.name === "HtmlWebpackPlugin"
    );
    if (!htmlWebpackPlugin) {
      return null;
    }
    const HtmlWebpackPlugin = htmlWebpackPlugin.constructor;
    if (!HtmlWebpackPlugin || !("getHooks" in HtmlWebpackPlugin)) {
      return null;
    }
    return HtmlWebpackPlugin as typeof HtmlWebpackPluginInstance;
  };

  apply(compiler: Compiler) {
    compiler.hooks.compilation.tap("HtmlWebpackPluginDjango", compilation => {
      const HtmlWebpackPlugin = this.extractHtmlWebpackPluginModule(compiler);
      if (!HtmlWebpackPlugin) {
        throw new Error("HtmlWebpackPluginDjango needs to be used with html-webpack-plugin 4 or 5");
      }

      const hooks = HtmlWebpackPlugin.getHooks(compilation);
      hooks.alterAssetTagGroups.tapAsync("HtmlWebpackPluginDjango", (data, callback) => {
        if (data.plugin.options === undefined) {
          throw new Error("No options configured for html-webpack-plugin");
        }
        data.headTags = this.transformAssets(data.headTags, data.publicPath);
        data.bodyTags = this.transformAssets(data.bodyTags, data.publicPath);
        callback(null, data);
      });
    });
  }

  transformLink(link: string | boolean | null | undefined, publicPath: string) {
    if (typeof link === "string") {
      const regex = new RegExp("^" + publicPath);
      const staticPath = path.join(this.options.bundlePath, link.replace(regex, ""));
      return link.match(regex) ? `{% static '${staticPath}' %}` : link;
    } else {
      return link;
    }
  }

  transformAssets(
    assets: HtmlWebpackPluginInstance.HtmlTagObject[],
    outputPublicPath: string | undefined
  ) {
    const publicPath = outputPublicPath === undefined ? "/" : outputPublicPath;
    return assets.map(asset => {
      asset.attributes["content"] = this.transformLink(asset.attributes["content"], publicPath);
      asset.attributes["href"] = this.transformLink(asset.attributes["href"], publicPath);
      asset.attributes["src"] = this.transformLink(asset.attributes["src"], publicPath);
      return asset;
    });
  }
}

export = HtmlWebpackPluginDjango;
