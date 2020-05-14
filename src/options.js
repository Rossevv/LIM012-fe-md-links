import mdLinks from "./mdLinks";
import chalk from "chalk";

const totalAndUnique = (arr) => {
  const uniques = [...new Set(arr.map((link) => link.href))].length;
  console.log(`Total: ${arr.length}\nUnique: ${uniques}`);
};

const brokens = (arr) => {
  const brokens = arr.filter((link) => link.validate !== "OK").length;
  console.log(`Broken: ${brokens} `);
};

const cli = (path, options) => {
  if (path) {
    mdLinks(path, options)
      .then((links) => {
        if (!!options && options.validate) {
          // si el usuario ingresa una opcion y es validate (eso evalua)
          if (options.stats) {
            totalAndUnique(links);
            brokens(links);
          } else 
            links.forEach(({ file, href, code, validate, text }) => {
              console.log(
                `${chalk.yellow(file)} ${chalk.cyan(href)} ${chalk.magenta(
                  validate
                )} ${chalk.magenta(code)} ${chalk.blue(text)}`
              );
            });
        } else if (!!options && options.stats) totalAndUnique(links);
        else
          links.forEach(({ file, href, text }) =>
            console.log(
              `⨭ ${chalk.yellow.underline(file)} 🡲 ${chalk.cyanBright(
                href
              )}...${chalk.blue(text)}`
            )
          )
          
      })
      .catch(() =>
        console.log(
          `\n${chalk
            .rgb(153, 255, 153)
            .bold(
              "---> Revisa la ruta, o no existen archivos con extensión .md dentro -->"
            )} ${chalk.bgRgb(153, 255, 153).yellow.bold(path)}\n `
        )
      );
  } else {
    // Si el usuario no pasa ningun path le saldra este aviso, con informacin sobre como debe ejecutar el comando CLI
    console.error(
      `\n${chalk.bgBlue
        .rgb(102, 255, 102)
        .bold("🡲  Especifique la ruta:  ")}`
    );
    console.log(
      `  ${chalk.cyan("r-mdlinks")} ${chalk.green.bold("<path>")}\n`
    );
    console.log(
      `\n${chalk.bgBlue.rgb(102, 255, 102).bold("🡲  Por ejemplo:  ")}`
    );
    console.log(
      `  ${chalk.cyan("r-mdlinks")} ${chalk.green.bold("md_directory")}`
    );
    console.log(
      `  ${chalk.cyan("r-mdlinks")} ${chalk.green.bold("file.md")}\n`
    );
    console.log(
      `${chalk.bgBlue.rgb(102, 255, 102).bold("🡲  Run  ")}${chalk.cyan(
        `\n${"  r-mdlinks"} --help`
      )} ${chalk.green.bold("para más información ")}\n`
    );
  }
};

module.exports = cli;
