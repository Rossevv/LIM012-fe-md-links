#!/usr/bin/env node
const fs = require('fs');
const marked = require('marked');
// libreria FILEHOUND para leer/recorrer directorios
const FileHound = require('filehound');
const path = require('path');
const chalk = require('chalk');

// FUNCIÓN PARA SABER SI LA RUTA ES DIRECTORIO

const isDirOrFile = (path) => new Promise((resolve, reject) => {
  // if (path.length === 'undefined') {
  //   console.log(chalk.bgYellow.red.bold('HELP. Ingresar Ruta Válida.'));
  // }
  fs.lstat(path, (err, stats) => {
    if (err) {
      // VERIFICA SI LA RUTA/ARCHIVO EXISTE fs.lstat (información de la ruta)
      if (err.code === 'ENOENT') {
        console.log(chalk.bgYellow.red.bold('Ruta inválida. Ingresar Ruta Válida.'));
      }
      // else if (err === 'ERR_INVALID_ARG_TYPE') {
      //   console.log(chalk.bgYellow.red.bold('HELP. Ingresar Ruta Válida.'));
      // }
    } else if (stats.isDirectory()) {
      // console.log(chalk.blue('La Ruta Ingresda es un Directorio'));
      readDir(path) // se obtiene el array de readDir en la variable 'res'.
        .then((res) => {
          Promise.all(res.map((files) => readFile(files))) // ambas llamadas se hacen simultaneamente
          // console.log(chalk.blue(files));
          // los "files" con ext .md, del resolve de readDir y con readFile tengo cada link con la estructura
          // ya los tengo con marked.renderer, file, href, text, next con map a los "links" literal van a arrLinks

            .then((res) => { // se obtiene el array de objetos de readFile en la variable 'res'y para seguir trabajando almacenamos todo ello en arrLinks
              const arrLinks = [];
              res.forEach((links) => {
                links.map((link) => arrLinks.push(link));
                // console.log(arrLinks);
                resolve(arrLinks);
              });
            });
        })
        .catch((err) => {
          reject(err);
        });
    } else { // si no es un dir identificamos los .md y se lee con readFile
      fileMD(path)
        .then((res) => {
          // console.log(chalk.blue('La Ruta Ingresda es un Archivo'));
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
});

// isDirOrFile('prueba')
// .then(resolve => console.log(resolve))
// .catch(err => console.log(err));

// FUNCION PARA LEER ARCHIVO/LINKS Y CREAR ARRAY
const readFile = (file) => new Promise((resolve, reject) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      reject(err);
    } else {
      const links = [];
      // metodo para que cree una nueva instancia en el array
      const renderer = new marked.Renderer();
      renderer.link = (href, title, text) => {
        links.push({
          file,
          href,
          text,
        });
      };
      marked(data, { renderer });
      resolve(links);
    }
  });
});
// devuelve un array de objetos
// readFile('prueba/README.md')
// .then(resolve => console.log(resolve))
// .catch(err => console.log(err));

// FUNCIÓN QUE VERIFICA SI LA EXTECIÓN DEL ARCHIVO ES .MD
const fileMD = (file) => new Promise((resolve, reject) => {
  const ext = path.extname(file);
  // console.log(chalk.green('Este Archivo es:'), chalk.yellow(ext));
  if (ext === '.md') {
    readFile(file)
      .then((res) => {
        resolve(res);// retorna un array de objetos con la estructura espefcificada den readFile
      })
      .catch((err) => {
        reject(err);
      });
  } else {
    reject(console.log(chalk.red('Error: el archivo No es .md')));
  }
});

// fileMD('prueba/README.md')
// .then(resolve => console.log(resolve))
// .catch(err => console.log(err));


// LEER UN DIRECTORIO EN BUSCA DE ARCHIVOS .MD CON FILEHOUND
const readDir = (path) => new Promise((resolve, reject) => {
  FileHound.create()
    .paths(path)
    .ext('md')
    .find((err, files) => {
      if (files.length === 0) {
        console.log(chalk.red('No existen archivos con extensi+on .md'));
      }
    })
    .then((files) => { // devuelve un array de todos los archivos .md, hace la recursividad.
      resolve(files);
    })
    .catch((err) => {
      reject(err);
    });
});

// readDir('prueba')
// .then(resolve => console.log(resolve))
// .catch(err => console.log(err));

// module.exports = mdLinks;
module.exports = isDirOrFile;
