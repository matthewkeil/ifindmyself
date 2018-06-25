import * as http2 from "http2";
import { SSL, PROD } from "../../src/util/helpers";
import { ServerError } from "../util";

/**
 *
 * Server config
 *
 */
const serverConfig: http2.SecureServerOptions = {
  key: SSL.API.KEY,
  cert: SSL.API.CERT,
  allowHTTP1: true
};
if (!PROD && process.env.CHECK_INCOMING_SSL) {
  serverConfig.ca = [SSL.CA_CERT];
  serverConfig.requestCert = true;
  serverConfig.rejectUnauthorized = true;
}

const server = http2.createSecureServer(serverConfig);

server.on("error", ServerError("unhandled http2 server error"));
