import path from "path";
import fs from "fs";

function removeFiles(startPath, filter) {
  if (!fs.existsSync(startPath)) {
    console.log("no dir ", startPath);
    return;
  }

  var files = fs.readdirSync(startPath);
  for (var i = 0; i < files.length; i++) {
    var filename = path.join(startPath, files[i]);
    var stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      removeFiles(filename, filter); //recurse
    } else if (filename.indexOf(filter) >= 0) {
      console.log("-- removing file: ", filename);
      fs.unlinkSync(filename);
    }
  }
}
function removeSourceMaps(startPath) {
  if (!fs.existsSync(startPath)) {
    console.log("no dir ", startPath);
    return;
  }

  var files = fs.readdirSync(startPath);
  for (var i = 0; i < files.length; i++) {
    var filename = path.join(startPath, files[i]);
    var stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      removeSourceMaps(filename); //recurse
    } else if (filename.endsWith(".js")) {
      let fileContent = fs.readFileSync(filename).toString();
      let result = fileContent.replace(/^\/\/# sourceMappingURL=.+$/gm, "");
      if (result !== fileContent) {
        console.log("-- removing SourceMap link: ", filename);
        fs.writeFileSync(filename, result);
      }
    }
  }
}

console.log("Starting Vite Workaround Script");
removeFiles("node_modules/@material", ".js.map");
removeSourceMaps("node_modules/@material");