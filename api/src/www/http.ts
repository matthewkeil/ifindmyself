import * as http from "http";
// import * as http2 from "http2";
import * as express from "express";
import * as morgan from "morgan";
import * as cors from "cors";
import { PORT, HOST, CORS_CONFIG, buildHeaders } from "./helpers";

export default async () => {
  const app = express();
  app.set("port", PORT.API.INSECURE);
  app.get(/.*favicon.ico/, (req, res) => res.end());
  app.use(morgan("dev"));
  app.use(buildHeaders);
  app.use(cors(CORS_CONFIG));
  app.use((req, res, next) => {
    res.redirect(307, "https://" + HOST.API + ":" + PORT.API.SECURE + req.url);
  });

  const server = http.createServer(app);

  const oldListen = server.listen;

  server.listen = () =>
    oldListen(PORT.API.INSECURE, () => {
      console.log(
        "Redirecting traffic from http port ",
        PORT.API.INSECURE,
        " to https for ",
        HOST.API
      );
    });

  return server;
};
