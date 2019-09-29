const marked = require("marked");
const fs = require("fs");

const htmlHead = `
<html>
<head>
<link href="https://fonts.googleapis.com/css?family=Merriweather&display=swap" rel="stylesheet"> 
<style>
body {
  font-size:100%; 
  line-height:1.5;
  font-family: 'Merriweather', Georgia, 'Times New Roman', Times, serif;
}
p, hr, h1, h2, h3, h4, h5, h6 {
  max-width:34em;
  margin:2em auto;
}
h1, h2, h3, h4, h5, h6 {
  text-align: center;
}
h1 {
  font-size: 2.747em;
  max-width: 15em;
  margin: 6em auto;
}
h2 {
  font-size: 0.874em;
  border-bottom: 1px solid gray;
  line-height: 4em;
  page-break-before: always;
  margin: 4em auto;
}
h3 {
  font-size:1.229em;
}
p {
  padding:0 1em;
}
</style>
</head>
<body>`;

const htmlFoot = `
</body>
</html>`;

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

function write(file, content) {
  return new Promise(resolve => {
    fs.writeFile(file, content, "utf-8", err => {
      if (err) throw err;
      resolve();
    });
  });
}

async function main() {
  const files = await readDir("src/story");
  let text = "";
  for (const name of files) {
    text = text + (await read("src/story/" + name));
  }
  const result = `${htmlHead}${marked(text)}${htmlFoot}`;
  await write("dist/xina2.html", result);
}

main();
