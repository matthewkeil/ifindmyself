import * as path from "path";
import { runCommand } from "./run-command";

const startNeo4j = async () => {
  try {
    const config = path.resolve(__dirname, "..", "neo4j");
    const home = path.resolve(__dirname, "..", "..", ".db", "neo4j");
    await runCommand(`NEO4J_CONF=${config} NEO4J_HOME=${home} neo4j start`);
  } catch (err) {
    console.error("error starting neo4j\n======================\n", err);
  }
};

export default startNeo4j();
