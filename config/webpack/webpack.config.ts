import * as path from "path";
import webpackValidator from "webpack-validator";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

const resolve = path.resolve;

const config = env => {
  const PROD = env.prod || process.env.NODE_ENV === "production";
  const ROOT = resolve(__dirname, "..", "..");

  const OUTPUT_DIR = PROD ? "build" : "dist";
  const OUTPUT = resolve(ROOT, OUTPUT_DIR);
  const PUB_PATH = PROD ? "/" : `/${OUTPUT_DIR}/`;

  const SERVER = {
    TSLINT: resolve(ROOT, "server", "tslint.json"),
    TSCONFIG: resolve(ROOT, "server", "tsconfig.json"),
    SRC: resolve(ROOT, "server", "src")
  };

  const CLIENT = {
    TSLINT: resolve(ROOT, "server", "tslint.json"),
    TSCONFIG: resolve(ROOT, "client", "tsconfig.json"),
    SRC: resolve(ROOT, "client", "src")
  };

  return webpackValidator({
    context: ROOT,
    entry: {
      client: CLIENT.SRC
    },
    output: {
      path: OUTPUT,
      publicPath: PUB_PATH,
      pathinfo: !PROD,
      filename: "bundle.js"
    },
    devtool: PROD ? "nosources-source-map" : "cheap-module-source-map",
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          include: CLIENT.SRC,
          exclude: /node_modules/,
          use: {
            loader: "awesome-typescript-loader"
          },
          options: {
            // disable type checker - we will use it in fork plugin
            transpileOnly: true
          }
        }
      ]
    },
    plugins: [
      // Perform type checking and linting in a separate process to speed up compilation
      new ForkTsCheckerWebpackPlugin({
        async: false,
        watch: CLIENT.SRC,
        tsconfig: CLIENT.TSCONFIG,
        tslint: CLIENT.TSLINT
      })
    ],
    node: {
      dgram: "empty",
      fs: "empty",
      net: "empty",
      tls: "empty",
      child_process: "empty"
    }
  });
};

export default config;
