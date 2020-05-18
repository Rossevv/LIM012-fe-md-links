"use strict";var fs=require("fs"),marked=require("marked"),fileHound=require("filehound"),path=require("path"),chalk=require("chalk"),isDirOrFile=function(a){return new Promise(function(b,c){fs.lstat(a,function(d,e){d?"ENOENT"===d.code:e.isDirectory()?readDir(a).then(function(a){// ---> Almacenamos en una variable 'filesPromises' las promesas obtenidas con la informacion de los archivos .md
var c=a.map(function(a){return readFile(a)});// ---> Resolvemos todas las promesas con 'Promise.all()'
Promise.all(c)// ambas llamadas se hacen simultaneamente
// ---> Unificamos la respuesta de un array de arrays a un array de objetos con la siguiente expresion: 'array[promisesArray.length -1]'
// ---> Una vez obtenemos el array de objetos lo retornamos en la respuesta de la promesa
.then(function(a){return b(a[c.length-1])})})["catch"](function(a){c(a)}):fileMD(a).then(function(a){b(a)})["catch"](function(a){c(a)})})})},links=[],readFile=function(a){return new Promise(function(b,c){fs.readFile(a,"utf8",function(d,e){if(d)c(d);else{var f=new marked.Renderer;f.link=function(b,c,d){links.push({file:a,href:b,text:d})},marked(e,{renderer:f}),b(links)}})})},fileMD=function(a){return new Promise(function(b,c){var d=path.extname(a);".md"===d?readFile(a).then(function(a){b(a)})["catch"](function(a){c(a)}):c(console.log(chalk.red("Error: el archivo No es .md")))})},readDir=function(a){return new Promise(function(b,c){fileHound.create().paths(a).ext("md").find(function(a,b){return 0===b.length,!1}).then(function(a){b(a)})["catch"](function(a){c(a)})})};// readDir('readme')
//   .then((resolve) => console.log(resolve))
//   .catch((err) => console.log(err));
// module.exports = mdLinks;
module.exports={isDirOrFile:isDirOrFile,readFile:readFile,readDir:readDir};