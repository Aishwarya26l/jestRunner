//getContents.js
const systemSync = require("./executeShellCommand");

function getContents() {
  return systemSync("cat /var/task/index.html");
}

module.exports = getContents;
