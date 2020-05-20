import {mdLinks} from "./mdLinks";
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
          );
      })
      .catch(() =>
        console.log(
          `\n${chalk
            .rgb(227, 13, 219)
            .bold(
              "---> PLEASE CHECK THE PATH (is wrong or there`rnt links into .md)-->"
            )} ${chalk.bgRgb(227, 13, 219).yellow.bold(path)}\n `
        )
      );
  } else {
    // Si el usuario no pasa ningun path le saldra este aviso, con informacin sobre como debe ejecutar el comando CLI
    console.error(
      `\n${chalk.bgYellow
        .rgb(112, 19, 147)
        .bold("🡲  Please specify the path:  ")}`
    );
    console.log(
      `  ${chalk.cyan("p-mdlinks")} ${chalk.yellow.bold("<path>")}\n`
    );
    console.log(
      `\n${chalk.bgYellow.rgb(112, 19, 147).bold("🡲  For example:  ")}`
    );
    console.log(
      `  ${chalk.cyan("p-mdlinks")} ${chalk.yellow.bold("md_directory")}`
    );
    console.log(
      `  ${chalk.cyan("p-mdlinks")} ${chalk.yellow.bold("README.md")}\n`
    );
    console.log(
      `${chalk.bgYellow.rgb(112, 19, 147).bold("🡲  Run  ")}${chalk.cyan(
        `\n${"  p-mdlinks"} --help`
      )} ${chalk.yellow.bold("for info ")}\n`
    );
  }
};

module.exports = cli;
