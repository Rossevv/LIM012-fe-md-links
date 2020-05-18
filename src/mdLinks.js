import isDirOrFile from "../src/index";
require('isomorphic-fetch')

// INFORMACIÓN DEL LINK (PETICIÓN HTTP CON FETCH)
const validateLinks = (files) => {
  return Promise.all(
    files.map(
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
};

// FUNCIÓN PARA EXTRAER LINKS A VALIDAR
const linksToValidate = (path) =>
  new Promise((resolve, reject) => {
    isDirOrFile(path)
      .then((res) => {
        return validateLinks(res)
      })
      .then((res) => {
            resolve(res);
      })
      .catch((err) => {
            reject(err);
      });
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


// mdLinks("testeo", {validate :true})
//   .then((resolve) => console.log(resolve))
//   .catch((err) => console.log(err));

module.exports = {mdLinks, validateLinks, validateLinks}

