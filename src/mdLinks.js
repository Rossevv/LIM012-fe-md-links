import { isDirOrFile } from "../src/index";
require('isomorphic-fetch');

// En el caso de que algun link falle y fetch no lo pueda analizar definimos un valor a retornar por defecto
// Si ejecutamos reject la ejecucion de la funcion se detiene y no se mostrara la informacion
// INFORMACIÓN DEL LINK (PETICIÓN HTTP CON FETCH)
const validateLinks = (filess) =>
  Promise.all(
    filess.map(
      (link) =>
        new Promise((resolve,reject) => {
          fetch(link.href)
            .then((res) => {
              link.validate = res.statusText !== "OK" ? "FAIL" : "OK"; // ok, fail
              link.code = res.status; // #
              resolve(link);
            })
            .catch((err) => {reject(err)});
        })
    )
  );
// FUNCIÓN PARA EXTRAER LINKS A VALIDAR
const linksToValidate = (path) =>
  new Promise((resolve, reject) => {
    isDirOrFile(path)
      .then((res) => {
        validateLinks(res)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => reject(err));
      })
  });
// ---> Renombrando la funcion a mdLinks ya que es la funcion principal
const mdLinks = (path, option) =>
  new Promise((resolve) => {
    if (option !== undefined) {
      linksToValidate(path).then((result) => resolve(result));
    } else {
      isDirOrFile(path).then((result) => resolve(result));
       // ---> Colocamos el else para que la funcion no se ejecute 2 veces
    }
  });
module.exports = {mdLinks, validateLinks,linksToValidate}
