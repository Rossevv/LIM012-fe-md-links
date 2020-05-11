#!/usr/bin/env node
"use strict";var fs=require("fs"),marked=require("marked"),FileHound=require("filehound"),path=require("path"),chalk=require("chalk"),isDirOrFile=function(a){return new Promise(function(b,c){// if (path.length === 'undefined') {
//   console.log(chalk.bgYellow.red.bold('HELP. Ingresar Ruta Válida.'));
// }
fs.lstat(a,function(d,e){d?"ENOENT"===d.code&&console.log(chalk.bgYellow.red.bold("Ruta inv\xE1lida. Ingresar Ruta V\xE1lida.")):e.isDirectory()?readDir(a)// se obtiene el array de readDir en la variable 'res'.
.then(function(a){Promise.all(a.map(function(a){return readFile(a)}))// ambas llamadas se hacen simultaneamente
// console.log(chalk.blue(files));
// los "files" con ext .md, del resolve de readDir y con readFile tengo cada link con la estructura
// ya los tengo con marked.renderer, file, href, text, next con map a los "links" literal van a arrLinks
.then(function(a){// se obtiene el array de objetos de readFile en la variable 'res'y para seguir trabajando almacenamos todo ello en arrLinks
var c=[];a.forEach(function(a){// console.log(arrLinks);
a.map(function(a){return c.push(a)}),b(c)})})})["catch"](function(a){c(a)}):fileMD(a).then(function(a){// console.log(chalk.blue('La Ruta Ingresda es un Archivo'));
b(a)})["catch"](function(a){c(a)})})})},readFile=function(a){return new Promise(function(b,c){fs.readFile(a,"utf8",function(d,e){if(d)c(d);else{var f=[],g=new marked.Renderer;// metodo para que cree una nueva instancia en el array
g.link=function(b,c,d){f.push({file:a,href:b,text:d})},marked(e,{renderer:g}),b(f)}})})},fileMD=function(a){return new Promise(function(b,c){var d=path.extname(a);// console.log(chalk.green('Este Archivo es:'), chalk.yellow(ext));
".md"===d?readFile(a).then(function(a){b(a)})["catch"](function(a){c(a)}):c(console.log(chalk.red("Error: el archivo No es .md")))})},readDir=function(a){return new Promise(function(b,c){FileHound.create().paths(a).ext("md").find(function(a,b){0===b.length&&console.log(chalk.red("No existen archivos con extensi+on .md"))}).then(function(a){// devuelve un array de todos los archivos .md, hace la recursividad.
b(a)})["catch"](function(a){c(a)})})};// readDir('prueba')
// .then(resolve => console.log(resolve))
// .catch(err => console.log(err));
// module.exports = mdLinks;
module.exports=isDirOrFile;