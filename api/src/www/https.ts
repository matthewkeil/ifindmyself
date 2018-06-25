import * as https from "https";

import * as express from "express";
import * as morgan from "morgan";
import * as session from "express-session";
import * as cors from "cors";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
import * as compression from "compression";

import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
// import { v1 as Neo4J } from "neo4j-driver";
import * as mongoose from "mongoose";
import * as connectMongo from "connect-mongo";
const MongoStore: connectMongo.MongoStoreFactory = connectMongo(session);

import {
  buildHeaders,
  CORS_CONFIG,
  MONGO,
  PORT,
  PROD,
  SECRETS,
  SSL
} from "../../src/util/helpers";

import { schema, Context } from "../graph";
import { ServerError } from "../util";
import User from "../graph/User/User";
import { isArray } from "util";
// import { User } from "../graph/User";

/**
 *
 * Server config
 *
 */
const serverConfig: https.ServerOptions = {
  key: SSL.API.KEY,
  cert: SSL.API.CERT
};
if (!PROD && process.env.CHECK_INCOMING_SSL) {
  serverConfig.ca = [SSL.CA_CERT];
  serverConfig.requestCert = true;
  serverConfig.rejectUnauthorized = true;
}
/**
 *
 * Setting up neo4j connection
 *
 */
// const neoDriver = Neo4J.driver(
//   NEO4J.URL,
//   Neo4J.auth.basic(NEO4J.USERNAME, NEO4J.PASSWORD)
// );
// if (!neoDriver.session) {
//   throw new Error("no neo4j client connection");
//   process.exit(1);
// }
// console.log('Connected to neo4j at ',NEO4J.URL);

/**
 *
 * mongodb connection
 *
 */
const db = mongoose.createConnection(
  MONGO.URL + "/" + MONGO.DB_NAME,
  MONGO.CONFIG
);
const sessionStore = mongoose.createConnection(
  MONGO.URL + "/ifm-sessions",
  MONGO.CONFIG
);
const oldClose = db.close;
db.close = () => {
  sessionStore.close();
  return oldClose();
};
db.on("error", ServerError("mongoose connection error"));
db.once("open", () =>
  console.log(`Connected to db ${MONGO.DB_NAME} at ${MONGO.URL}`)
);

/**
 *
 * session config
 *
 */
const sessionDays = 14;
const sessionConfig: session.SessionOptions = {
  secret: SECRETS.SESSION,
  saveUninitialized: true,
  resave: false,
  cookie: {
    path: "/",
    httpOnly: true,
    secure: true,
    maxAge: 1000 * 60 * 60 * 24 * sessionDays
  },
  name: "ifmSession", // prevent sniffing of session methodology
  store: new MongoStore({
    ttl: 60 * 60 * 24 * sessionDays,
    mongooseConnection: sessionStore
  })
};

/**
 *
 * ========================
 *      Create server
 * ========================
 *
 */
export default async () => {
  /**
   *
   * build app
   *
   */
  const app = express();
  app.set("port", PORT.API.SECURE);
  app.get(/.*favicon.ico.*/, (req, res) => res.end());
  app.use(buildHeaders, (req, res, next) => {
    const days = 365;
    res.setHeader(
      "Strict-Transport-Security",
      `max-age=${60 * 60 * 24 * days}; includeSubdomains;`
    );
    next();
  });
  app.use(morgan("dev"));
  app.use(cors(CORS_CONFIG));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(session(sessionConfig));
  if (PROD) app.use(compression());
  else app.use("/", graphiqlExpress({ endpointURL: "/graphql" }));

  const context: Context = { db };
  app.use(
    "/graphql",
    (req, res, next) => {
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      if (req.headers.authorization) {
        const token = isArray(req.headers.authorization)
          ? req.headers.authorization[0].split(" ")[1]
          : req.headers.authorization.split(" ")[1];

        let user = User.fromToken(token);
        if (user) context.user = user;
      }
      next();
    },
    graphqlExpress({
      schema,
      context
    })
  );

  /**
   *
   * Instantiate secure node server
   *
   */
  const server = https.createServer(serverConfig, app);

  server.on("close", () => {
    // neoDriver.close();
    db.close();
  });

  process.on("exit", () => {
    server.removeAllListeners();
    // neoDriver.close();
    db.close().then(() => server.close());
  });

  const originalListen = server.listen;
  server.listen = () =>
    originalListen(PORT.API.SECURE, () =>
      console.log("GraphQL listening on https port", PORT.API.SECURE)
    );

  return server;
};
