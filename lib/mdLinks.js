"use strict";var _index=require("../src/index");require("isomorphic-fetch");// En el caso de que algun link falle y fetch no lo pueda analizar definimos un valor a retornar por defecto
// Si ejecutamos reject la ejecucion de la funcion se detiene y no se mostrara la informacion
// INFORMACIÓN DEL LINK (PETICIÓN HTTP CON FETCH)
var validateLinks=function(a){return Promise.all(a.map(function(a){return new Promise(function(b,c){fetch(a.href).then(function(c){// ok, fail
// #
a.validate="OK"===c.statusText?"OK":"FAIL",a.code=c.status,b(a)})["catch"](function(a){c(a)})})}))},linksToValidate=function(a){return new Promise(function(b,c){(0,_index.isDirOrFile)(a).then(function(a){validateLinks(a).then(function(a){b(a)})["catch"](function(a){return c(a)})})})},mdLinks=function(a,b){return new Promise(function(c){b===void 0?(0,_index.isDirOrFile)(a).then(function(a){return c(a)}):linksToValidate(a).then(function(a){return c(a)})})};// FUNCIÓN PARA EXTRAER LINKS A VALIDAR
module.exports={mdLinks:mdLinks,validateLinks:validateLinks,linksToValidate:linksToValidate};