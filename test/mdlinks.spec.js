// import * as e6p from "es6-promise";
// (e6p as any).polyfill();
// const mdLinks = require('../src/mdLinks');
import { isDirOrFile } from '../src/index';
import { readFile } from '../src/index';
import { readDir } from '../src/index';
import { mdLinks } from '../src/mdLinks';
// import { fetchMock } from 'fetch-mock';
const fetchMock = require ('fetch-mock');

import { validateLinks } from '../src/mdLinks'; 

require('isomorphic-fetch');



const newArray = [
  {
    file: 'prueba\\prueba1.md',
    href: 'https://docs.npmjs.com/getting-started/publishing-npm-packages',
    text: 'Publicar packpage',
    validate: 'OK',
    code: 200
  },
  {
    file: 'prueba\\pepito\\pepito2.md',
    href: 'https://nodejs.org/api/path.html',
    text: 'Path',
    validate: 'OK',
    code: 200
  },
  {
    file: 'prueba\\pepito\\pepito1.md',
    href: 'https://nodejs.org/docs/latest-v0.10.x/api/modules.html',
    text: 'módulos (CommonJS)',
    validate: 'OK',
    code: 200
  }
]


fetchMock
.mock('https://www.nasa.gov/', 200)
.mock('https://git-scm.comps/', 404)
.mock('*', 200);




describe('function linksToValidate', () => {
    test('la función que valida los links debe retornar statusCode 200', (done) => {
        validateLinks(
          [
            {
              file: 'prueba\\prueba1.md',
              href: 'https://docs.npmjs.com/getting-started/publishing-npm-packages',
              text: 'Publicar packpage'
            },
            {
              file: 'prueba\\pepito\\pepito2.md',
              href: 'https://nodejs.org/api/path.html',
              text: 'Path'
            },
            {
              file: 'prueba\\pepito\\pepito1.md',
              href: 'https://nodejs.org/docs/latest-v0.10.x/api/modules.html',
              text: 'módulos (CommonJS)'
            },
          ])
        .then((resp) => {
            expect(resp).toStrictEqual(newArray);
            done();
        });
    });
});

describe('readFiles', () => {
  it('Debería extraer los links de files con extensión .md', (done) => {
    try {
      expect(readFile('prueba/prueba1.md')).resolves.toMatchObject(
        [
          {
            file: 'prueba/prueba1.md',
            href: 'https://docs.npmjs.com/getting-started/publishing-npm-packages',
            text: 'Publicar packpage'
          }
        ]
      );
      done();
    } catch (error) {
      done(error);
    }
  });
});

describe('readDir', () => {
  it('Debería ingresar a un directorio y extraer files con extensión .md', (done) => {
    try {
      expect(readDir('prueba')).resolves.toStrictEqual(
        [
          'prueba\\pepito\\pepito1.md',
          'prueba\\pepito\\pepito2.md',
          'prueba\\prueba1.md',
          'prueba\\prueba2.md'
        ]
      );
      done();
    } catch (error) {
      done(error);
    }
  });
});

// describe('isDirOrFile', () => {
//   it('Debería ingresar a un directorio y extraer los links de files xon extensión .md', (done) => {
//     try {
//       expect(isDirOrFile('prueba')).resolves.toEqual(
//         [
//           {
//             file: "prueba/prueba1.md",
//             href: "https://docs.npmjs.com/getting-started/publishing-npm-packages",
//             text: "Publicar packpage",
//           },
//           {
//             file: 'prueba\\pepito\\pepito1.md',
//             href: 'https://nodejs.org/docs/latest-v0.10.x/api/modules.html',
//             text: 'módulos (CommonJS)'
//           },
//           {
//             file: 'prueba\\pepito\\pepito2.md',
//             href: 'https://nodejs.org/api/path.html',
//             text: 'Path'
//           }
//         ]
//       );
//       done();
//     } catch (error) {
//       done(error);
//     }
//   });
// });



describe('mdLinks', () => {
  it('Debería validar los links OK / FAIL', () => {
     
      return expect(mdLinks('prueba', {validate: true})).resolves.toEqual(
        [
          {
            file: 'prueba\\pepito\\pepito2.md',
            href: 'https://nodejs.org/api/path.html',
            text: 'Path',
            validate: 'OK',
            code: 200
          },
          {
            file: 'prueba\\prueba1.md',
            href: 'https://docs.npmjs.com/getting-started/publishing-npm-packages',
            text: 'Publicar packpage',
            validate: 'OK',
            code: 200
          },
          {
            file: 'prueba\\pepito\\pepito1.md',
            href: 'https://nodejs.org/docs/latest-v0.10.x/api/modules.html',
            text: 'módulos (CommonJS)',
            validate: 'OK',
            code: 200
          }
        ]
      );
  });
});

