const wordsCount = require("words-count");
const fs = require("fs");
const { table } = require("table");

function readDir(dir) {
  return new Promise(resolve => {
    fs.readdir(dir, (err, files) => {
      if (err) throw err;
      resolve(files);
    });
  });
}

function read(file) {
  return new Promise(resolve => {
    fs.readFile(file, "utf8", (err, data) => {
      if (err) throw err;
      resolve(data);
    });
  });
}

async function main() {
  console.log("Word count in src/story");
  console.log("========");
  console.log("");
  const data = [];
  const config = {
    columns: {
      1: {
        alignment: "right"
      }
    },
    singleLine: true
  };
  const files = await readDir("src/story");
  let totalWords = 0;
  for (const name of files) {
    const text = await read("src/story/" + name);
    const words = wordsCount(text);
    data.push([name, words]);
    totalWords += words;
  }
  data.push(["total", totalWords]);
  console.log(table(data, config));
}

main();
