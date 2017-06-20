
// options is optional
//glob("**/server/data/units/*.json", function (er, files) {
  //  console.log(files);
    // files is an array of filenames.
    // If the `nonull` option is set, and nothing
    // was found, then files is ["**/*.js"]
    // er is an error object or null.
//})
var glob = require('glob');
console.log(glob.sync('**/server/data/units/*.json'));