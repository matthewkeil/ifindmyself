import run from "./run-command";

setTimeout(() => run(`mongo < ${__dirname}/mongodb-create-root`), 3000);
