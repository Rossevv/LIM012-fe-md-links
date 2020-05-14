#!/usr/bin/env node

const chalk = require("chalk");
const commander = require("commander");
const packageJson = require("./package.json");
const cli = require("./lib/options");

const program = new commander.Command(packageJson.bin)
  .arguments("<path>")
  .usage(`${chalk.green("<path>")} [options]`)
  .option("-v, --validate")
  .option("-s, --stats")
  .on("--help", () => {
    console.log(`\n Only ${chalk.green("<path>")} is required.\n`);
    console.log(`Choose option ${chalk.cyan("--validate")} for:`);
    console.log(
      ` ${chalk.magenta(
        "- Check and validate all links in your md files extension"
      )}`
    );
    console.log(
      ` ${chalk.magenta(
        "- Will return the following information: path, link, name, status code, and status text"
      )}\n`
    );
    console.log(`Choose option ${chalk.cyan("--stats")}for:`);
    console.log(
      ` ${chalk.magenta(
        "- Check and get information about which links are unique and the total of links you have"
      )}\n`
    );
    console.log(`Both options ${chalk.cyan("--validate --stats")} for:`);
    console.log(
      ` ${chalk.magenta(
        "- Will return the following links's information: Unique, Broken and Total of links in the files md extension"
      )}\n`
    );
    console.log(
      `${chalk.bgYellow.black(
        "If you have any problems, do not hesitate to file an issue "
      )}`
    );
    console.log(` ${chalk.cyan("")}\n`);
  });

program.parse(process.argv);

if (!program.validate && !program.stats) cli(process.argv[2]);
if (!!program.validate && !program.stats)
  cli(process.argv[2], { validate: program.validate });
if (!program.validate && !!program.stats)
  cli(process.argv[2], { stats: program.stats });
if (!!program.validate && !!program.stats)
  cli(process.argv[2], {
    validate: program.validate,
    stats: program.stats,
  });
