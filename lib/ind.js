// #!/usr/bin/env node
// const mdLinks = require('./mdLinks')
// const path = require('path');
// const chalk = require('chalk');
// /* GUARDA EN UNA VARIABLE EL ARGUMENTO QUE ESCRIBE EL USUARIO 
// EN LA TERMINAL(PATH) */
// let pathToFile = process.argv[2];
// //console.log('path to file:', pathToFile);
// // Path Absoluto
// pathToFile = path.resolve(pathToFile);
// pathToFile = path.normalize(pathToFile);
// //console.log(chalk.green('Path Absolute:', pathToFile));
// // Argumeto en index 3
// let option1 = process.argv[3];
// //console.log('Option 1 to file:', option1);
// // Argumeto en index 4
// let option2 = process.argv[4];
// //console.log('Option 2 to file:', option2);
// mdLinks(pathToFile, option1, option2)
//     .then(res=>{
//         //console.log(chalk.yellow('Links Encontrados - Index:',res));
//         // console.log(chalk.yellow('Links Encontrados:'),res);
//         if(res.length == 0){
//           // console.log(chalk.red('No se encontraron Links dentro del Archivo.'));
//         }
//       })
//       .catch(err=>{
//         //console.log(chalk.red('Error - Index:',err));
//       })
"use strict";