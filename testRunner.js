// include node fs module
const fs = require('fs');
//testRunner.js
const systemSync = require("./executeShellCommand");

function testRunner(shownCode, editedCode) {
  //uuidgen
  //let uuidgen = systemSync("uuidgen");

  // writeFileSync function with filename, content and callback function
  fs.writeFileSync('/tmp/example.js', shownCode, function (err) {
    if (err) throw err;
    console.log('File is created successfully.');
  }); 
  
  fs.writeFileSync('/tmp/example.test.js', editedCode, function (err) {
    if (err) throw err;
    console.log('File is created successfully.');
  }); 
  
  let npmTest = 'CI=true npm test'; 
  let npmTestResults = systemSync(npmTest)
  
  let npmTestJSON = 'CI=true npm run test-json'; 
  let npmTestJSONResults = systemSync(npmTestJSON)
  let finalnpmTestJSONResults = {}
  
  if(typeof(npmTestJSONResults) === "string"){
    let lines = npmTestJSONResults.split('\n');
    // remove three lines, starting at the first position
    lines.splice(0,3);
    // join the array back into a single string
    let newtext = lines.join('\n');
    finalnpmTestJSONResults = JSON.parse(newtext)
  }else{
    finalnpmTestJSONResults = npmTestJSONResults
  }
  
  //const npmCoverageResults = systemSync("CI=true npm run coverage");
  
  let result =
    "<h4>npm test results :- </h4>" +
    (typeof npmTestResults === "string" ? npmTestResults : JSON.stringify(npmTestResults, null, 2));

  // result += "<hr/>";
  // result +=
  //   "<h4>npm run coverage results :- </h4>" +
  //   (typeof npmCoverageResults === "string"
  //     ? npmCoverageResults
  //     : JSON.stringify(npmCoverageResults, null, 2));
  // result += systemSync("cat /tmp/coverage.txt");
  
  let isCorrect = finalnpmTestJSONResults.numTotalTestSuites == finalnpmTestJSONResults.numPassedTestSuites ? true :false;
  let textResults = "Total test suites = " + finalnpmTestJSONResults.numTotalTestSuites + "\n Test suits Passed = " +finalnpmTestJSONResults.numPassedTestSuites;
  
  let allFeedback = {
    isCorrect: isCorrect,
    htmlFeedback: result,
    jsonFeedback: JSON.stringify(finalnpmTestJSONResults, null, 2),
    textFeedback: textResults
  };
  return allFeedback;
}
module.exports = testRunner;
