// include node fs module
const fs = require("fs");
//testRunner.js
const systemSync = require("./executeShellCommand");

function testRunner(shownCode, editedCode, hiddenCode) {
  systemSync("mkdir -p /tmp/example/node_modules");

  // writeFileSync function with filename, content and callback function
  fs.writeFileSync("/tmp/example/example.js", shownCode, function(err) {
    if (err) throw err;
    console.log("File is created successfully.");
  });

  fs.writeFileSync("/tmp/example/example.test.js", editedCode, function(err) {
    if (err) throw err;
    console.log("File is created successfully.");
  });

  //Copy over related project files
  systemSync("cp -r /var/task/node_modules/* /tmp/example/node_modules");
  systemSync(
    "cp -r /var/task/node_modules/.bin /tmp/example/node_modules/.bin"
  );
  systemSync("cp -r /var/task/package.json /tmp/example/package.json");
  systemSync("cp -r /var/task/jest.config.js /tmp/example/jest.config.js");

  console.log(systemSync("ls -la /tmp/example"));
  console.log(systemSync("ls -la /tmp/example/node_modules/.bin"));

  let allFeedback = {
    isCorrect: false,
    htmlFeedback: "Default output",
    jsonFeedback: {},
    textFeedback: "Default output"
  };

  switch (hiddenCode.split("\n")[0].trim()) {
    case "npm test":
      let npmTest = "cd /tmp/example; CI=true npm test";
      let npmTestResults = systemSync(npmTest);

      let npmTestJSON = "cd /tmp/example; CI=true npm run test-json";
      let npmTestJSONResults = systemSync(npmTestJSON);
      let finalnpmTestJSONResults = {};

      if (typeof npmTestJSONResults === "string") {
        let lines = npmTestJSONResults.split("\n");
        // remove three lines, starting at the first position
        lines.splice(0, 3);
        // join the array back into a single string
        let newtext = lines.join("\n");
        finalnpmTestJSONResults = JSON.parse(newtext);
      } else {
        finalnpmTestJSONResults = npmTestJSONResults;
      }
      let textResults =
        "Total test suites = " +
        finalnpmTestJSONResults.numTotalTestSuites +
        "\nTest suits Passed = " +
        finalnpmTestJSONResults.numPassedTestSuites;
      let htmlResult =
        "<h4>npm test results :- </h4>" +
        (typeof npmTestResults === "string"
          ? npmTestResults
          : JSON.stringify(npmTestResults, null, 2));
      allFeedback = {
        isCorrect: finalnpmTestJSONResults.success,
        htmlFeedback: htmlResult,
        jsonFeedback: JSON.stringify(finalnpmTestJSONResults, null, 2),
        textFeedback: textResults
      };
      break;
    case "npm run coverage":
      const npmCoverageResults = systemSync(
        "cd /tmp/example; CI=true npm run coverage"
      );
      let htmlNewResult =
        "<h4>npm run coverage results :- </h4>" +
        (typeof npmCoverageResults === "string"
          ? npmCoverageResults
          : JSON.stringify(npmCoverageResults, null, 2));
      htmlNewResult += systemSync("cat /tmp/example/coverage.txt");
      const npmCoverageJSONResults = systemSync(
        "cd /tmp/example; CI=true npm run jsonCoverage"
      );
      let finalnpmCoverageJSONResults = {};
      if (typeof npmCoverageJSONResults === "string") {
        let lines = npmCoverageJSONResults.split("\n");
        // remove three lines, starting at the first position
        lines.splice(0, 3);
        // join the array back into a single string
        let newtext = lines.join("\n");
        finalnpmCoverageJSONResults = JSON.parse(newtext);
      } else {
        finalnpmCoverageJSONResults = npmCoverageJSONResults;
      }
      let textNewResults =
        "Total test suites = " +
        finalnpmCoverageJSONResults.numTotalTestSuites +
        "\nTest suits Passed = " +
        finalnpmCoverageJSONResults.numPassedTestSuites;
      allFeedback = {
        isCorrect: finalnpmCoverageJSONResults.success,
        htmlFeedback: htmlNewResult,
        jsonFeedback: JSON.stringify(finalnpmCoverageJSONResults, null, 2),
        textFeedback: textNewResults
      };
      break;
    default:
      break;
  }

  return allFeedback;
}
module.exports = testRunner;
