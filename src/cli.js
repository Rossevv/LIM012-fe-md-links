#!/usr/bin/env node

const path = require('path');
const chalk = require('chalk');
const mdLinks = require('./mdLinks');

// const [,, ...args] = process.argv;
// console.log(`say hello ${args}`);


// EN LA TERMINAL(PATH)
let pathToFile = process.argv[2];
pathToFile = path.resolve(pathToFile);
pathToFile = path.normalize(pathToFile);
const option1 = process.argv[3];
const option2 = process.argv[4];
// const option3 = process.argv[1];

const commandsHelp = () => {
  console.log(chalk.black.bgCyanBright.bold('Options:                                                             '));
  console.log(chalk.black.bgCyanBright.bold('--validate: Is possible to validate links.                           '));
  console.log(chalk.black.bgCyanBright.bold('--stats: It will show TOTAL and UNIQUE links.                        '));
  console.log(chalk.black.bgCyanBright.bold('--validate and --stats: It will show TOTAL, UNIQUE and BROKEN links\n'));
};

// if (pathToFile) {
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


mdLinks(pathToFile, option1, option2)
  .then((res) => {
    console.log(chalk.yellow('Links Encontrados:'), res);
    if (res.length === 0) {
      console.log(chalk.red('No se encontraron Links dentro del Archivo.'));
    }
  })
  .catch((err) => {
    if (err.code === [ERR_INVALID_ARG_TYPE]) {
      console.log('Help');
    }
    // reject(err);
  });
