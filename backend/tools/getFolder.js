const fs = require("fs");

const getFolder = (path) => {
  fs.stat(path, (err) => {
    if (err) {
      fs.mkdir(path, (err) => console.log(`Images folder ${err ? "cannot be created "+err  : "created"}`));
      return
    };
    console.log("Images folder is exist");
  });

  return path;
}

module.exports = getFolder;