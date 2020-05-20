const fs = require("fs");
const marked = require("marked");
const fileHound = require("filehound");
const path = require("path");
const chalk = require("chalk");

// FUNCIÓN PARA SABER SI LA RUTA ES DIRECTORIO
const isDirOrFile = (path) =>
  new Promise((resolve, reject) => {
    fs.lstat(path, (err, stats) => {
      if (err) {
          return(err.code)
      } else if (stats.isDirectory()) {
        readDir(path)
          .then((res) => {
            const filesPromises = res.map((files) => readFile(files));
            Promise.all(filesPromises) // ambas llamadas se hacen simultaneamente
             .then((res) => resolve(res[filesPromises.length - 1])); // unificamos todas las respuestas en un solo array y lo retornamos
          })
          .catch((err) => reject(err));
      } else {
        fileMD(path)
      }
    });
  });
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
// FUNCIÓN QUE VERIFICA SI LA EXTECIÓN DEL ARCHIVO ES .MD
const fileMD = (file) =>
  new Promise((resolve, reject) => {
    if (path.extname(file) === ".md") {
      readFile(file)
        .then((res) => {
          resolve(res);
        })
    } else {
      reject(console.log(chalk.red("Error: el archivo No es .md")));
    }
  });
// LEER UN DIRECTORIO EN BUSCA DE ARCHIVOS .MD CON FILEHOUND
const readDir = (path) =>
  new Promise((resolve) => {
    fileHound
      .create()
      .paths(path)
      .ext("md")
      .find()
      .then((files) => {
        resolve(files);
      })
      .catch((err) => {
        reject(err);
      });
  });
module.exports = {isDirOrFile,readFile,readDir,fileMD};