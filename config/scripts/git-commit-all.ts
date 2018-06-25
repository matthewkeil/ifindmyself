import { runCommand } from "./run-command";

const gitAddAndCommitAll = async () => {
  try {
    const now = new Date();

    await runCommand("git add -A");
    await runCommand(`git commit -m 'automatic update at ${now.toString()}'`);
  } catch (err) {
    console.error("error committing changes to git\n", err);
  }
};

export default gitAddAndCommitAll();
