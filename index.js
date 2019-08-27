const getContents = require("./getContents");
const testRunner = require("./testRunner");

exports.handler = async event => {
  process.env.PATH =
    process.env.PATH + ":" + process.env.LAMBDA_TASK_ROOT + "/bin";
  const indexPage = getContents();

  if (event.httpMethod === "GET") {
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/html"
      },
      body: indexPage
    };
  }

  if (event.httpMethod === "POST") {
    const parsedBodyContent = JSON.parse(event.body);
    const shownCode = parsedBodyContent["shown"]["0"];
    const editedCode = parsedBodyContent["editable"]["0"];
    const hiddenCode = parsedBodyContent["hidden"]["0"];

    let allFeedback = testRunner(shownCode, editedCode, hiddenCode);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        isComplete: allFeedback["isCorrect"],
        jsonFeedback: allFeedback["jsonFeedback"],
        htmlFeedback: allFeedback["htmlFeedback"],
        textFeedback: allFeedback["textFeedback"]
      })
    };
  }
};
