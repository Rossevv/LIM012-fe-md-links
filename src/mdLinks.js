#!/usr/bin/env node
const fetch = require('node-fetch');
const chalk = require('chalk');
const isDirOrFile = require('./index');

const files = [
  {
    file: 'prueba/README.md',
    href: 'https://hackernoon.com/understanding-promises-in-javascript-13d99df067c1juanito',
    text: 'Linea de comando CLI',
  },
  {
    file: 'prueba/README.md',
    href: 'https://javascript.info/promise-basics',
    text: 'Comprendiendo Promesas en Js',
  },
  {
    file: 'prueba/README.md',
    href: 'https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452ejunaito',
    text: 'Linea de comando CLI',
  },
];

// INFORMACIÓN DEL LINK (PETICIÓN HTTP CON FETCH)
const validateOption = (filess) => Promise.all(filess.map(
  (link) => new Promise((resolve, reject) => {
    fetch(link.href)
      .then((res) => {
        link.validate = (res.statusText !== 'OK') ? 'FAIL' : 'OK'; // ok, fail
        link.code = res.status;// #
        resolve(link);
      // console.log(res);
      })
      .catch((err) => {
        reject(err);
      //  console.log(err);
      });
  }),
));

// validateOption(files)
// .then(resolve => console.log(resolve))
// .catch(err => console.log(err));


// FUNCIÓN PARA EXTRAER LINKS A VALIDAR
const linksToValidate = (path) => new Promise((resolve, reject) => {
  isDirOrFile(path)
    .then((res) => {
      // console.log(chalk.yellow('Ingreso Opción Validate.'));
      validateOption(res)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    })
    .catch((err) => {
      reject(err);
    });
});

// linksToValidate('prueba')
// .then(resolve => console.log(resolve))
// .catch(err => console.log(err));


// STAST
const statsOption = (path) => new Promise((resolve, reject) => {
  let arrLinks = [];
  let totalLinks = 0;
  let uniqueLinks = 0;
  linksToValidate(path)
    .then((links) => {
      arrLinks = links.map((link) => link.href);
      totalLinks = arrLinks.length;
      uniqueLinks = [...new Set(arrLinks)].length;
      // con los tres puntos colocamos dentro del array la cantidad de links únicos
      // console.log(chalk.cyan.bold('Links Totales:'), totalLinks, arrLinks)
      const objectTotalLinks = {
        Total: totalLinks,
        Unique: uniqueLinks,
      };
      resolve(objectTotalLinks);
    })
    .catch((err) => {
      reject(err);
    });
});
// statsOption('prueba')
// .then(resolve => console.log(resolve))
// .catch(err => console.log(err));

const statsBroken = (path) => new Promise((resolve, reject) => {
  let brokenLinks = 0;
  linksToValidate(path)
    .then((links) => {
      const brokens = links.filter(({ validate }) => validate !== 'OK');
      brokenLinks = brokens.length;
      // console.log(chalk.cyan.bold('Links Totales:'), totalLinks, arrLinks)
      const objectTotalLinks = { Broken: brokenLinks };
      resolve(objectTotalLinks);
    })
    .catch((err) => {
      reject(err);
    });
});
// statsBroken('prueba')
// .then(resolve => console.log(resolve))
// .catch(err => console.log(err));

const statsAndValidate2 = (path) => new Promise((resolve, reject) => {
  Promise.all([statsOption(path), statsBroken(path)]).then((values) => {
    const statsValidate = {
      Total: values[0].Total,
      Unique: values[0].Unique,
      Broken: values[1].Broken,
    };
    resolve(statsValidate);
  })
    .catch((err) => {
      reject(err);
    });
});


// console.log(newObj);


// VERIFICAR SI EL USUARIO INTRODUJO OPTIONS
let validate = false;
let stats = false;

const mdLinks = (path, option1, option2) => new Promise((resolve, reject) => {
  if (option1 === '--validate' && option2 === '--stats' || option1 === '--stats' && option2 === '--validate') {
    validate = true;
    stats = true;
    // console.log(chalk.yellow('Ingreso Opciones: Validate y Stats.
    //  Por Favor Ingresa solo una Opción.'));
    resolve(statsAndValidate(path));
  } else if (option1 === '--validate' && option2 === undefined) {
    validate = true;
    resolve(linksToValidate(path));
  } else if (option1 === '--stats' && option2 === undefined) {
    stats = true;
    // console.log(chalk.yellow('Ingreso Opcion Stats'));
    resolve(statsOption(path));
  } else {
    // console.log(chalk.red('Opcion No Valida.'),
    // 'Las Opciones validas son:\n --validate\n --stats');
    resolve(isDirOrFile(path));
  }
  reject(err);
});

// mdLinks('prueba', '--stats', '--validate')
//   .then((resolve) => console.log(resolve))
//   .catch((err) => console.log(err));


module.exports = mdLinks;
