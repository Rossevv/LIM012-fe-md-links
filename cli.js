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
    console.log(`\nOnly ${chalk.blue("<path>")} is required.\n`);
    console.log(`Opción: ${chalk.blue("--validate")} para:`);
    console.log(` ${chalk.green("- Revisa y valida todos todos los links en tus archivos con extensión .md con OK/FAIL")}`);
    console.log(` ${chalk.green("- Retornará la siguiente información de los links: path, link, file, status text, status code")}\n`);
    console.log(`Opción: ${chalk.blue("--stats")} para:`);
    console.log(` ${chalk.green("- Retorna estadísticas básicas de los links encontrados: Totales(Totales) y Unicos(Unique)")}\n`);
    console.log(`Ambas opciones ${chalk.blue("--validate --stats")} para:`);
    console.log(` ${chalk.green("- Retornará estadísticas básicas de los links encontrados: Unique, Broken y Total")}\n`);
    console.log(`${chalk.bgGreen.black("Si tiene problemas, no dude en dejar un 'issue'.")}`);
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
