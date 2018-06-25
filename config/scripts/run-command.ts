const util = require("util");
const exec = util.promisify(require("child_process").exec);

export default async (command: string) => {
  const { stdout, stderr } = await exec(command);

  console.warn(">>> Running command from node with terminal script\n>>>");
  if (stderr.toString().length > 0) {
    console.error(
      `"${command}"\n>>>\n>>> An error was thrown:\n\n${stderr.toString()}\n>>>\n>>>\n`
    );
    process.exit(1);
  }

  console.warn(
    `"${command}"\n>>>\n>>> The following was output:\n\n${stdout.toString()}\n>>>\n>>>\n`
  );
};
