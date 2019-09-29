const wordsCount = require("words-count");
const fs = require("fs");
const treeify = require("treeify");

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

async function countDir(dir) {
  const files = await readDir(dir);
  let result = {};
  let totalWords = 0;
  for (const name of files) {
    const dirOrFile = `${dir}/${name}`;
    if (fs.lstatSync(dirOrFile).isDirectory()) {
      const subResult = await countDir(dirOrFile);
      result = { ...result, ...subResult.tree };
      totalWords += subResult.words;
    } else {
      const text = await read(`${dir}/${name}`);
      const words = wordsCount(text);
      result[`${name} - [${words}]`] = true;
      totalWords += words;
    }
  }
  return { tree: { [`${dir} - [${totalWords}]`]: result }, words: totalWords };
}

async function main() {
  let result = (await countDir("src")).tree;
  console.log(treeify.asTree(result, false));
}

main();
