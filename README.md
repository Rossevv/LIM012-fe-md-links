# Markdown Links
Objetivo alcanzado: La librería lee y analice archivos en formato `Markdown`, para verificar los links que contengan y reportar
algunas estadísticas.

## Diagrama de flujo inicial

<p align="center">
  <img src="https://storage.googleapis.com/md-links/flowchart.png">
</p>

## Documentación técnica de la librería

La funcionalidad principal de la librería es poder extraer los links de un archivo markdown.

Esto se puede lograr si el usuario proporciona una ruta a el o los archivos markdown que desee analizar. Estos links también pueden ser analizados mediante 2 opciones, validate y stats.

#### `r-mdLinks (path, options)`

##### Argumentos

- `path`: Ruta absoluta o relativa al archivo o directorio.
- `options`: Un objeto con las siguientes propiedades:
  - `validate`: { validate : true }

##### Valor de retorno

La función retorna los links, los cuales contienen las siguientes propiedades:

- `href`: URL encontrada.
- `text`: Texto que aparecía dentro del link (`<a>`).
- `file`: Ruta del archivo donde se encontró el link.

<!-- [![Watch the video](https://storage.googleapis.com/md-links/video11.png)](https://youtu.be/kNADJomsQ3o) -->

#### Ejemplo

```js
const mdLinks = require("r-mdlinks");

mdLinks("./test/dir")
  .then((links) => {
    // => [{ href, text, file }]
  })
  .catch(console.error);
```

![ruta_links](https://user-images.githubusercontent.com/55680887/81956746-4b2a7a80-95d1-11ea-91b1-1801d7f2f1cf.png)

```js
const mdLinks = require("md-links");

mdLinks("./test/dir", { validate: true })
  .then((links) => {
    // => [{ href, text, file, status, ok }]
  })
  .catch(console.error);
```

![ruta&validate links](https://user-images.githubusercontent.com/55680887/81956839-68f7df80-95d1-11ea-8ff2-cecfc3eb3173.png)


### CLI (Command Line Interface - Interfaz de Línea de Comando)

El ejecutable de nuestra aplicación también puede ejecutarse de la siguiente
manera a través de la terminal:

`npx r-mdlinks <path-to-file> [options]`

Por ejemplo:

```sh
$ r-mdlinks ./some/example.md
./some/example.md http://algo.com/2/3/ Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html algún doc
./some/example.md http://google.com/ Google
```

El comportamiento por defecto no valida si las URLs responden ok o no,
solo identifica el archivo markdown, analiza el archivo Markdown e imprime los links que vaya
encontrando, junto con la ruta del archivo donde aparece y el texto
que hay dentro del link (truncado a 50 caracteres).

#### Options

##### `--validate`

Si pasamos la opción `--validate`, el módulo hace una petición HTTP para
averiguar si el link funciona o no.

Por ejemplo:

```sh
$ r-mdlinks ./some/example.md --validate
./some/example.md http://algo.com/2/3/ OK 200 Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html FAIL 404 algún doc
./some/example.md http://google.com/ OK 301 Google
```

Vemos que el _output_ en este caso incluye la palabra `OK` o `FAIL` después de
la URL, así como el status de la respuesta recibida a la petición HTTP a dicha
URL.

##### `--stats`

Si pasamos la opción `--stats`:

```sh
$ r-mdlinks ./some/example.md --stats
Total: 3
Unique: 3
```

También podemos combinar `--stats` y `--validate`:

```sh
$ r-mdlinks ./some/example.md --stats --validate
Total: 3
Unique: 3
Broken: 1
```
##### Adicionalmente (help) `--h`

Si pasamos la opción `--h` el output (salida) es las opciones que el usuario puede ejecutar en la línea de comandos.

![--h](https://user-images.githubusercontent.com/55680887/81957416-2551a580-95d2-11ea-8df3-7b03158dede1.png)


## Guía de uso e instalación de la librería

Módulo instalable via `npm install r-mdlinks`. Este módulo incluye un ejecutable como una interfaz que se puede importar con `require`.

```sh
1.- En el terminal de tu proyecto: npm install r-mdlinks
2.- Puedes hacer importarlo mediante require (ver los ejemplos de arriba para más detalle)
```
