#!/usr/bin/env node
"use strict";var path=require("path"),chalk=require("chalk"),mdLinks=require("./mdLinks"),pathToFile=process.argv[2];pathToFile=path.resolve(pathToFile),pathToFile=path.normalize(pathToFile);var option1=process.argv[3],option2=process.argv[4],commandsHelp=function(){console.log(chalk.black.bgCyanBright.bold("Options:                                                             ")),console.log(chalk.black.bgCyanBright.bold("--validate: Is possible to validate links.                           ")),console.log(chalk.black.bgCyanBright.bold("--stats: It will show TOTAL and UNIQUE links.                        ")),console.log(chalk.black.bgCyanBright.bold("--validate and --stats: It will show TOTAL, UNIQUE and BROKEN links\n"))};// if (pathToFile) {
//   mdLinks(pathToFile, option1, option2)
//     .then((res) => {
//       console.log(chalk.yellow('Links Encontrados:'), res);
//       if (res.length === 0) {
//         console.log(chalk.red('No se encontraron Links dentro del Archivo.'));
//       }
//     })
//     .catch((err) => reject(err));
// } else if (pathToFile === '') {
//   console.log(chalk.cyan('Innvalid Command, enter "--help" for valid command'));
// } else {
//   console.log(commandsHelp);
// }
mdLinks(pathToFile,option1,option2).then(function(a){console.log(chalk.yellow("Links Encontrados:"),a),0===a.length&&console.log(chalk.red("No se encontraron Links dentro del Archivo."))})["catch"](function(a){[ERR_INVALID_ARG_TYPE]===a.code&&console.log("Help")});