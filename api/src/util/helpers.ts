import * as path from "path";
import * as fs from "fs";
import * as helmet from "helmet";
import * as express from "express";
import * as mongoose from "mongoose";
/**
 *
 * environment
 *
 */
export const PROD = process.env.NODE_ENV === "production";
export const TEST = process.env.NODE_ENV === "testing";
export const DEV = !(PROD || TEST);

/**
 *
 * paths
 *
 */
const from = (absPath: string) => (...segments: string[]): string =>
  path.resolve(absPath, ...segments);
const ROOT = path.resolve(__dirname, "..", "..");
const SERVER = path.resolve(__dirname, "..");
const SRC = path.resolve(__dirname, "..", "src");
export const FROM = { ROOT: from(ROOT), SERVER: from(SERVER), SRC: from(SRC) };

/**
 *
 * SSL
 *
 */
export const SSL = {
  API: {
    CERT: fs.readFileSync(FROM.SERVER("config", "ssl", "ifindmyself.crt")),
    KEY: fs.readFileSync(FROM.SERVER("config", "ssl", "ifindmyself.key"))
  },
  CA_CERT: fs.readFileSync(FROM.ROOT("config", "ssl", "rootCA.crt")),
  MONGO: {
    PEM: fs.readFileSync(FROM.ROOT("config/mongodb/mongod.pem"))
  }
};

/**
 *
 * host configuration
 *
 */
export const HOST = {
  API: PROD ? process.env.HOST || "ifindmyself.com" : "localhost",
  NEO4J: process.env.NEO4J_HOST || "bolt://localhost",
  MONGO: process.env.MONGO_HOST || "localhost"
};

/**
 *
 * port configuration
 *
 */
const normalizePort = (val: any) => {
  let port = parseInt(val);

  if (isNaN(port)) {
    // is a named pipe
    return val;
  }

  if (port >= 0) {
    // port is a number
    return port;
  }

  return undefined;
};
export const PORT = {
  API: {
    SECURE: normalizePort(
      process.env.SECURE_PORT || PROD ? 443 : 3001
    ) as number,
    INSECURE: normalizePort(
      process.env.REDIRECT_PORT || PROD ? 80 : 3099
    ) as number
  },
  NEO4J: normalizePort(process.env.NEO4J_PORT || 7687) as number,
  MONGO: normalizePort(process.env.MONGO_PORT || 27017) as number
};

/**
 *
 * neo4j constants
 *
 */
export const NEO4J = {
  URL: HOST.NEO4J + ":" + PORT.NEO4J,
  USERNAME: process.env.NEO4J_USERNAME || "neo4j",
  PASSWORD: process.env.NEO4J_PASSWORD || "neo4j"
};

/**
 *
 * mongodb constants
 *
 */
const mongoLogin = (): string =>
  MONGO.USERNAME && MONGO.PASSWORD
    ? MONGO.USERNAME + ":" + MONGO.PASSWORD + "@"
    : "";
const mongoUrl = (): string =>
  `mongodb://${MONGO.LOGIN + HOST.MONGO}:${PORT.MONGO}`;
const mongoConfig = (): mongoose.ConnectionOptions => ({
  auth: {
    user: MONGO.USERNAME,
    password: MONGO.PASSWORD
  },
  ...(!!MONGO.SSL
    ? {
        ssl: true,
        sslValidate: true as any,
        sslCA: [SSL.CA_CERT],
        sslKey: SSL.MONGO.PEM
      }
    : {})
});
export const MONGO = {
  USERNAME: process.env.MONGO_USERNAME || "ifmApi",
  PASSWORD: process.env.MONGO_PASSWORD || "ifmApi",
  SSL: process.env.MONGO_SSL || false,
  LOGIN: mongoLogin(),
  URL: mongoUrl(),
  CONFIG: mongoConfig(),
  DB_NAME: process.env.MONGO_NAME || "ifm"
};

/**
 *
 * secrets
 *
 */
export const SECRETS = {
  SESSION: process.env.SESSION_SECRET || "SessionSecretShhhSilly....",
  JWT: process.env.JWT_SECRET || "SessionSecretShhhSilly...."
};

/**
 *
 * CORS config
 *
 */
export const CORS_CONFIG = {
  origin: PROD ? /https.*ifindmyself\.com$/ : /localhost/,
  methods: ["POST", "OPTIONS"],
  credentials: true,
  // exposedHeaders: ["Link"],
  allowHeaders: [
    "Authorization",
    "Accept",
    "Content-Type",
    "DNT",
    "Viewport-Width",
    "Width"
  ]
};

/**
 *
 * Content Security Policy
 *
 */
const CSP_CONFIG: helmet.IHelmetContentSecurityPolicyConfiguration = {
  browserSniff: true,
  directives: {
    frameAncestors: [`'none'`],
    objectSrc: [`'none'`],
    pluginTypes: [`'none'`],
    // blockAllMixedContent: true,
    childSrc: [`'self'`],
    connectSrc: [`'self'`],
    defaultSrc: [`'self'`],
    fontSrc: [`'self'`],
    formAction: [`'self'`],
    frameSrc: [`'self'`],
    imgSrc: [`'self'`],
    // manifestSrc: [`'self'`],
    mediaSrc: [`'self'`],
    // prefetchSrc: [`'self'`],
    reportUri: "/cspViolations",
    scriptSrc: [`'self'`],
    styleSrc: [`'self'`]
    // upgradeInsecureRequests: true,
    // workerSrc: [`'self'`]
  }
};

export const buildHeaders = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  req.app.use(helmet.contentSecurityPolicy(CSP_CONFIG));
  res.setHeader("X-Powered-By", "ifindmyself");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("Referrer-Policy", "origin-when-cross-origin");
  res.setHeader("X-Robots-Tag", "noindex, nofollow");
  res.setHeader("X-DNS-Prefetch-Control", "off");
  res.setHeader("X-Download-Options", "noopen");
  next();
};
