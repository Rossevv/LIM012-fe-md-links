
// const mdLinks = require('../src/mdLinks');
import { isDirOrFile } from '../src/index';
import { readFile } from '../src/index';
import { readDir } from '../src/index';
import { mdLinks } from '../src/mdLinks';
const fetchMock = require('fetch-mock')
import { validateLinks } from '../src/mdLinks'; 
require('isomorphic-fetch')

// const {linksToValidate} = require('../src/mdLinks');

fetchMock
.mock('https://www.nasa.gov/', 200)
.mock('https://git-scm.comps/', 404)
.mock('*',200)

const newArray = [{"code": 200, "file": "testeo\\prueba.md", "href": "https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array", "text": "Array en MDN", "validate": "OK"}, {"code": 200, "file": "testeo\\prueba.md", "href": "https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/forEach", "text": "Array MDN", "validate": "OK"}, {"code": 200, "file": "testeo\\prueba.md", "href": "https://git-scm.com/", "text": "Git", "validate": "OK"}]

describe('function linksToValidate', () => {
    test('la función que valida los links debe retornar statusCode 200', (done) => {
        validateLinks([
          {
            file: 'testeo\\prueba.md',
            href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array',
            text: 'Array en MDN'
          },
          {
            file: 'testeo\\prueba.md',
            href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/forEach',
            text: 'Array MDN'
          },
          {
            file: 'testeo\\prueba.md',
            href: 'https://git-scm.com/',
            text: 'Git'
          }
        ])
        .then((resp) => {
            expect(resp).toStrictEqual(newArray);
            done();
        });
    });
});



it('Deberia retornar error si el archivo no es .md', () =>{
  expect(isDirOrFile('testeo.js')).rejects.toThrow('ENOENT');
});




describe('readFiles', () => {
  it('Debería extraer los links de files con extensión .md', (done) => {
    try {
      expect(readFile('testeo/prueba.md')).resolves.toMatchObject([
        {
          file: 'testeo/prueba.md',
          href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array',
          text: 'Array en MDN'
        },
        {
          file: 'testeo/prueba.md',
          href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/forEach', 
          text: 'Array MDN'
        },
        {
          file: 'testeo/prueba.md',
          href: 'https://git-scm.com/',
          text: 'Git'
        }
      ]);
      done();
    } catch (error) {
      done(error);
    }
  });
});


describe('isDirOrFile', () => {
  it('Debería ingresar a un directorio y extraer los links de files xon extensión .md', (done) => {
    try {
      expect(isDirOrFile('testeo')).resolves.toEqual([
        {
          file: 'testeo\\prueba.md',
          href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array',
          text: 'Array en MDN'
        },
        {
          file: 'testeo\\prueba.md',
          href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/forEach',
          text: 'Array MDN'
        },
        {
          file: 'testeo\\prueba.md',
          href: 'https://git-scm.com/',
          text: 'Git'
        }
      ]);
      done();
    } catch (error) {
      done(error);
    }
  });
});

describe('readDir', () => {
  it('Debería ingresar a un directorio y extraer files con extensión .md', (done) => {
    try {
      expect(readDir('testeo')).resolves.toStrictEqual([
        'testeo\\prueba.md', 
        'testeo\\prueba2.md'
      ]);
      done();
    } catch (error) {
      done(error);
    }
  });
});

describe('mdLinks', () => {
  it.only('Debería validar los links OK / FAIL', () => {
     
      return expect(mdLinks('testeo', {validate: true})).resolves.toStrictEqual([
        {
          file: 'testeo\\prueba.md',
          href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array',
          text: 'Array en MDN',
          validate: 'OK',
          code: 200
        },
        {
          file: 'testeo\\prueba.md',
          href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/forEach', 
          text: 'Array MDN',
          validate: 'OK',
          code: 200
        },
        {
          file: 'testeo\\prueba.md',
          href: 'https://git-scm.com/',
          text: 'Git',
          validate: 'OK',
          code: 200
        }
      ]);
  });
});

