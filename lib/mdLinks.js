"use strict";var _index=require("../src/index");require("isomorphic-fetch");// INFORMACIÓN DEL LINK (PETICIÓN HTTP CON FETCH)
var validateLinks=function(a){return Promise.all(a.map(function(a){return new Promise(function(b){fetch(a.href).then(function(c){// ok, fail
// #
a.validate="OK"===c.statusText?"OK":"FAIL",a.code=c.status,b(a)})["catch"](function(){// ---> En el caso de que algun link falle y fetch no lo pueda analizar definimos un valor a retornar por defecto
// ---> Si ejecutamos reject la ejecucion de la funcion se detiene y no se mostrara la informacion
a.validate="FAIL",a.code=404,b(a)})})}))},linksToValidate=function(a){return new Promise(function(b,c){(0,_index.isDirOrFile)(a).then(function(a){validateLinks(a).then(function(a){b(a)})["catch"](function(a){c(a)})})["catch"](function(a){c(a)})})},mdLinks=function(a,b){return new Promise(function(c){b===void 0?c((0,_index.isDirOrFile)(a)):c(linksToValidate(a))})};// FUNCIÓN PARA EXTRAER LINKS A VALIDAR
// module.exports = mdLinks;
// const mdLinks = (path, option) =>
//   new Promise((resolve) => {
//     if (option !== undefined) {
//       linksToValidate(path).then((result) => resolve(result));
//     } else {
//       isDirOrFile(path).then((result) => resolve(result));
//        // ---> Colocamos el else para que la funcion no se ejecute 2 veces
//     }
//   });
mdLinks("prueba",{validate:!0}).then(function(a){return console.log(a)})["catch"](function(a){return console.log(a)}),module.exports={mdLinks:mdLinks,validateLinks:validateLinks};