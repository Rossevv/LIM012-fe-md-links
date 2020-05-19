const fs = require("fs");
const marked = require("marked");
const fileHound = require("filehound");
const path = require("path");
const chalk = require("chalk");

// const fs = require("fs");
// const marked = require("marked");
// const fileHound = require("filehound");
// const path = require("path");
// const chalk = require("chalk");






// FUNCIÓN PARA SABER SI LA RUTA ES DIRECTORIO

const isDirOrFile = (path) =>
  new Promise((resolve, reject) => {
    fs.lstat(path, (err, stats) => {
      if (err) {
        if (err.code === "ENOENT") {
        }
      } else if (stats.isDirectory()) {
        readDir(path)
          .then((res) => {
            // ---> Almacenamos en una variable 'filesPromises' las promesas obtenidas con la informacion de los archivos .md
            const filesPromises = res.map((files) => readFile(files));
            // ---> Resolvemos todas las promesas con 'Promise.all()'
            Promise.all(filesPromises) // ambas llamadas se hacen simultaneamente
              // ---> Unificamos la respuesta de un array de arrays a un array de objetos con la siguiente expresion: 'array[promisesArray.length -1]'
              // ---> Una vez obtenemos el array de objetos lo retornamos en la respuesta de la promesa
              .then((res) => resolve(res[filesPromises.length - 1])); // unificamos todas las respuestas en un solo array y lo retornamos
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        fileMD(path)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  });

  // isDirOrFile('prueba')
  // .then((resolve) => console.log(resolve))
  // .catch((err) => console.log(err));

const links = [];

// FUNCION PARA LEER ARCHIVO/LINKS Y CREAR ARRAY
const readFile = (file) =>
  new Promise((resolve, reject) => {
    fs.readFile(file, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
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


// readFile('prueba/prueba1.md')
//   .then((resolve) => console.log(resolve))
//   .catch((err) => console.log(err));


// FUNCIÓN QUE VERIFICA SI LA EXTECIÓN DEL ARCHIVO ES .MD
const fileMD = (file) =>
  new Promise((resolve, reject) => {
    const ext = path.extname(file);
    if (ext === ".md") {
      readFile(file)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    } else {
      reject(console.log(chalk.red("Error: el archivo No es .md")));
    }
  });

// LEER UN DIRECTORIO EN BUSCA DE ARCHIVOS .MD CON FILEHOUND
const readDir = (path) =>
  new Promise((resolve, reject) => {
    fileHound
      .create()
      .paths(path)
      .ext("md")
      .find((err, files) => {
        if (files.length === 0) {
        }
        return false;
      })
      .then((files) => {
        resolve(files);
      })
      .catch((err) => {
        reject(err);
      });
  });

// readDir('prueba')
//   .then((resolve) => console.log(resolve))
//   .catch((err) => console.log(err));

// module.exports = mdLinks;
// module.exports = isDirOrFile;




module.exports = {isDirOrFile,readFile,readDir};