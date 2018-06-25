export { Context } from "./graph";

import { buildHttp, buildHttps } from "./www";
import { ServerError } from "./util";

buildHttp()
  .then(server => server.listen())
  .catch(ServerError("unhandled redirect server error"));

buildHttps()
  .then(server => server.listen())
  .catch(ServerError("unhandled graphql server error"));
