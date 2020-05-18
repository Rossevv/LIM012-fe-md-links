"use strict";var _index=_interopRequireDefault(require("../src/index"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}require("isomorphic-fetch");// INFORMACIÓN DEL LINK (PETICIÓN HTTP CON FETCH)
var validateLinks=function(a){Promise.all(a.map(function(a){return new Promise(function(b){fetch(a.href).then(function(c){// ok, fail
// #
a.validate="OK"===c.statusText?"OK":"FAIL",a.code=c.status,b(a)})["catch"](function(){// ---> En el caso de que algun link falle y fetch no lo pueda analizar definimos un valor a retornar por defecto
// ---> Si ejecutamos reject la ejecucion de la funcion se detiene y no se mostrara la informacion
a.validate="FAIL",a.code=404,b(a)})})}))},linksToValidate=function(a){return new Promise(function(b,c){(0,_index["default"])(a).then(function(a){validateLinks(a).then(function(a){b(a)})["catch"](function(a){c(a)})})["catch"](function(a){c(a)})})},mdLinks=function(a,b){return new Promise(function(c){b===void 0?c((0,_index["default"])(a)):c(linksToValidate(a))})};// FUNCIÓN PARA EXTRAER LINKS A VALIDAR
// mdLinks("testeo", {validate :true})
//   .then((resolve) => console.log(resolve))
//   .catch((err) => console.log(err));
module.exports={mdLinks:mdLinks,validateLinks:validateLinks};