const fetch = require("node-fetch");
const isDirOrFile = require("./index");

// INFORMACIÓN DEL LINK (PETICIÓN HTTP CON FETCH)
const validateLinks = (filess) =>
  Promise.all(
    filess.map(
      (link) =>
        new Promise((resolve) => {
          fetch(link.href)
            .then((res) => {
              link.validate = res.statusText !== "OK" ? "FAIL" : "OK"; // ok, fail
              link.code = res.status; // #
              resolve(link);
            })
            .catch((err) => {
              // ---> En el caso de que algun link falle y fetch no lo pueda analizar definimos un valor a retornar por defecto
              // ---> Si ejecutamos reject la ejecucion de la funcion se detiene y no se mostrara la informacion
              link.validate = "FAIL";
              link.code = 404;
              resolve(link);
            });
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
          .catch((err) => {
            reject(err);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });

// ---> Renombrando la funcion a mdLinks ya que es la funcion principal
const mdLinks = (path, option) =>
  new Promise((resolve) => {
    if (option !== undefined) {
      resolve(linksToValidate(path));
    } else resolve(isDirOrFile(path)); // ---> Colocamos el else para que la funcion no se ejecute 2 veces
  });

// mdLinks("readme", { validate: false })
//   .then((resolve) => console.log(resolve))
//   .catch((err) => console.log(err));

module.exports = mdLinks;
