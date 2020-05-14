"use strict";var fetch=require("node-fetch"),isDirOrFile=require("./index"),validateLinks=function(a){return Promise.all(a.map(function(a){return new Promise(function(b){fetch(a.href).then(function(c){// ok, fail
// #
a.validate="OK"===c.statusText?"OK":"FAIL",a.code=c.status,b(a)})["catch"](function(){// ---> En el caso de que algun link falle y fetch no lo pueda analizar definimos un valor a retornar por defecto
// ---> Si ejecutamos reject la ejecucion de la funcion se detiene y no se mostrara la informacion
a.validate="FAIL",a.code=404,b(a)})})}))},linksToValidate=function(a){return new Promise(function(b,c){isDirOrFile(a).then(function(a){validateLinks(a).then(function(a){b(a)})["catch"](function(a){c(a)})})["catch"](function(a){c(a)})})},mdLinks=function(a,b){return new Promise(function(c){b===void 0?c(isDirOrFile(a)):c(linksToValidate(a))})};// mdLinks("readme", { validate: false })
//   .then((resolve) => console.log(resolve))
//   .catch((err) => console.log(err));
module.exports=mdLinks;