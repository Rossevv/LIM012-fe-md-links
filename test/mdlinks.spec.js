const getAbsolutePath = require('../src/index');
const mdLinks = require('./mdLinks')
// import { getAbsolutePath } from './index.js';

describe('Read the route', () => {
  it('Should return a absolute path', () => {
    expect(getAbsolutePath('README.md')).toBe(
      'C:\\Users\\Estudiante\\Desktop\\md-links\\LIM012-fe-md-links\\README.md'
    );
  });
  it('Should return a relative path', () => {
    expect(getAbsolutePath('README.md')).toBe(
      'C:\\Users\\Estudiante\\Desktop\\md-links\\LIM012-fe-md-links\\README.md'
    );
  });
});



describe('mdLinks', () => {
  it('Deberia ser una función', () => {
    expect(typeof (mdLinks)).toBe('function');
  });
  it('Deberia leer un archivo .md y retornar los links encontrados', () =>{
    expect(mdLinks('./prueba.md')).resolves.toEqual([
      {
        file: 'C:\\Users\\NUCLEOS\\Documents\\GitHub\\SCL009-md-links\\test\\prueba-md\\prueba.md',
        herf: 'https://github.com/workshopper/learnyounode',
        text: 'learnyounode'
      },
      {
        file: 'C:\\Users\\NUCLEOS\\Documents\\GitHub\\SCL009-md-links\\test\\prueba-md\\prueba.md',
        herf: 'https://github.com/workshopper/how-to-npm',
        text: 'how-to-npm'
      },
      {
        file: 'C:\\Users\\NUCLEOS\\Documents\\GitHub\\SCL009-md-links\\test\\prueba-md\\prueba.md',
        herf: 'https://github.com/stevekane/promise-it-wont-hurt',
        text: 'promise-it-wont-hurt'
      }
    ]);
  });
  it('Debería retornar error si el archivo no existe', ()  => {
    expect(mdLinks('./prueba1.md')).rejects.toThrow('Ruta No Valida. Por Favor, Ingresar Ruta Valida.');
  });
  it('Deberia retornar error si el archivo no es .md', () =>{
    expect(mdLinks('./prueba.js')).rejects.toThrow('ENOENT');
  });

  it('Deberia recorrer un directorio y retornar los links encontrados dentro de los archivo .md que contenga', () =>{
     expect(mdLinks('./prueba-md')).resolves.toBe(
      [
        {
          file: 'C:\\Users\\NUCLEOS\\Documents\\GitHub\\SCL009-md-links\\test\\prueba-md\\prueba.md',
          herf: 'https://github.com/workshopper/learnyounode',
          text: 'learnyounode'
        },
        {
          file: 'C:\\Users\\NUCLEOS\\Documents\\GitHub\\SCL009-md-links\\test\\prueba-md\\prueba.md',
          herf: 'https://github.com/workshopper/how-to-npm',
          text: 'how-to-npm'
        },
        {
          file: 'C:\\Users\\NUCLEOS\\Documents\\GitHub\\SCL009-md-links\\test\\prueba-md\\prueba.md',
          herf: 'https://github.com/stevekane/promise-it-wont-hurt',
          text: 'promise-it-wont-hurt'
        },
        {
          file: 'C:\\Users\\NUCLEOS\\Documents\\GitHub\\SCL009-md-links\\test\\prueba-md\\prueba2.md',
          herf: 'https://nodejs.org/es/about/',
          text: 'Acerca de Node.js - Documentación oficial'
        },
        {
          file: 'C:\\Users\\NUCLEOS\\Documents\\GitHub\\SCL009-md-links\\test\\prueba-md\\prueba2.md',
          herf: 'https://medium.freecodecamp.org/what-exactly-is-node-js-ae36e97449f5',
          text: 'What exactly is Node.js? - freeCodeCamp'
        },
        {
          file: 'C:\\Users\\NUCLEOS\\Documents\\GitHub\\SCL009-md-links\\test\\prueba-md\\prueba2.md',
          herf: 'https://www.youtub.com/watch?v=WgSc1nv_04Gweee',
          text: '¿Qué es Nodejs? Javascript en el Servidor - Fazt en YouTube'
        },
        {
          file: 'C:\\Users\\NUCLEOS\\Documents\\GitHub\\SCL009-md-links\\test\\prueba-md\\prueba2.md',
          herf: 'https://www.genbeta.com/desarrollo/node-js-y-npm',
          text: 'Node.js y npm'
        },
        {
          file: 'C:\\Users\\NUCLEOS\\Documents\\GitHub\\SCL009-md-links\\test\\prueba-md\\prueba2.md',
          herf: 'https://www.genbeta.com/desarrollo/node-js-y-npm',
          text: 'Node.js y npm'
        }
      ]);
   });

   it('Deberia retornar una advertencia si no encuentra archivos .md dentro del directorio', () =>{
     expect(mdLinks('./prueba-js')).resolves.toThrow('No se encontraron Archivos .md')
    });

  it('Deberia leer un archivo .md, retornar los links encontrados y validarlos', () =>{
    expect(mdLinks('./prueba.md', '--validate')).resolves.toBe([
      {
        file: 'C:\\Users\\NUCLEOS\\Documents\\GitHub\\SCL009-md-links\\test\\prueba-md\\prueba.md',
        herf: 'https://github.com/workshopper/learnyounode',
        text: 'learnyounode',
        status: 'OK',
        code: 200
      },
      {
        file: 'C:\\Users\\NUCLEOS\\Documents\\GitHub\\SCL009-md-links\\test\\prueba-md\\prueba.md',
        herf: 'https://github.com/workshopper/how-to-npm',
        text: 'how-to-npm',
        status: 'OK',
        code: 200
      },
      {
        file: 'C:\\Users\\NUCLEOS\\Documents\\GitHub\\SCL009-md-links\\test\\prueba-md\\prueba.md',
        herf: 'https://github.com/stevekane/promise-it-wont-hurt',
        text: 'promise-it-wont-hurt',
        status: 'OK',
        code: 200
      }
    ]);
  });

  it('Deberia leer un archivo .md, retornar stadisticas de los links encontrados: Totales - Unicos', () =>{
    expect(mdLinks('./prueba2.md', '--stats')).resolves.toBe({ Total: 5, Unique: 4 });
  });

})
