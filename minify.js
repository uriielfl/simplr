const Terser = require("terser");
const fs = require("fs");
const path = require("path");

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? 
      walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
};

walkDir('dist/src', function(filePath) {
  if (path.extname(filePath) === '.js') {
    const code = fs.readFileSync(filePath, 'utf8');
    Terser.minify({[filePath]: code}).then(result => {
      if (result.error) {
        console.error(`Minification failed for ${filePath}:`, result.error);
        process.exit(1);
      }
      if (!result.code) {
        console.error(`Minification did not result in any code for ${filePath}`);
        process.exit(1);
      }
      console.log(filePath)
      fs.writeFileSync(filePath, result.code);
    });
  }
});