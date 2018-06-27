import run from "./run-command";

setTimeout(() => run(`mongo < ${__dirname}/mongodb-create-root.mongo`), 3000);
