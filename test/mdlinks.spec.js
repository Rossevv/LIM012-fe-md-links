
import { isDirOrFile } from '../src/index';
import { linksToValidate } from '../src/mdLinks';
import { readDir } from '../src/index';
import { mdLinks } from '../src/mdLinks';
import { fileMD } from '../src/index';
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
test('fileMD', () => {
  return expect(fileMD('prueba/prueba1.md')).resolves.toEqual(
    [
      {
        file: 'prueba/prueba1.md',
        href: 'https://docs.npmjs.com/getting-started/publishing-npm-packages',
        text: 'Publicar packpage'
      }
    ]
  );
});
test('should resolve to some value', () => {
  return expect(readDir('prueba')).resolves.toEqual(
  [
    'prueba\\pepito\\pepito1.md',
    'prueba\\pepito\\pepito2.md',
    'prueba\\prueba1.md',
  ]);
});
it('Deberia retornar ENOENT si la ruta es incorrecta', () =>{
  expect(isDirOrFile('./prueba.js')).rejects.toThrow('ENOENT');
});
it('Deberia retornar error si la ruta es incorrecta', () =>{
  expect(mdLinks('./prueba.js')).rejects.toThrow('ENOENT');
});
test('error fileMD', () => {
  return expect(fileMD('prueba/prueba1.m')).rejects.toBe(undefined);
});

test('should resolve to some value', () => {
  return expect(linksToValidate('functionTest')).resolves.toEqual(
    [{
    "code": 200, 
    "file": "prueba/prueba1.md", 
    "href": "https://docs.npmjs.com/getting-started/publishing-npm-packages", 
    "text": "Publicar packpage", 
    "validate": "OK"
    }, 
    {"code": 200, 
    "file": "functionTest\\file.md", 
    "href": "https://www.pluralsight.com/guides/test-asynchronous-code-jest", 
    "text": "Test Jest", 
    "validate": "OK"
  }]
  )
});

test('should resolve to some value', () => {
  return expect(mdLinks('functionTest', {validate:true})).resolves.toEqual(
  [
  {
      "code": 200,
      "file": "prueba/prueba1.md",
      "href": "https://docs.npmjs.com/getting-started/publishing-npm-packages",
      "text": "Publicar packpage",
      "validate": "OK",
    },
  {
      "code": 200,
      "file": "functionTest\\file.md",
      "href": "https://www.pluralsight.com/guides/test-asynchronous-code-jest",
      "text": "Test Jest",
      "validate": "OK",
    },
  {
      "code": 200,
      "file": "functionTest\\file.md",
      "href": "https://www.pluralsight.com/guides/test-asynchronous-code-jest",
      "text": "Test Jest",
      "validate": "OK",
      }
    ]
  )
});

