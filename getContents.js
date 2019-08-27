//getContents.js

function getContents() {
  const indexPage = `<html>
  <head>
    <meta charset="utf-8" />
    <meta
      content="width=device-width,initial-scale=1,minimal-ui"
      name="viewport"
    />
    <link
      rel="shortcut icon"
      href="data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/////////////////////////+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/////6+fv/W0KZ/1tCmf9bQpn//v7+///////////+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////W0KZ/1tCmf9bQpn/W0KZ/1tCmf9bQpn//v7//////////////////Y+PjzkAAAAAAAAAAAAAAAAAAAAA/////1tCmf9bQpn//////1tCmf9bQpn/W0KZ/1tCmf9bQpn/W0GZ/0gTkv/+/v7//////wAAAAAAAAAAAAAAAP////9bQpn//////////9r/////opDE/1tCmf9bQpn/W0KZ/1tCmf9bQpn/W0KZ/1o+mv//////AAAAAAAAAAD/////Z1Ke//////8AAAAAAAAAAP////+FcrL/W0KZ/1tCmf9bQpn/W0KZ/1tCmf9bQpn//////wAAAAAAAAAAAAAAAP//////////////SwAAAAAAAAAA//////////9bQpn/W0KZ/19Hm/////////////////8AAAAAAAAAAP////v/////W0KZ//////8AAAAA/////04jlf9cRJr//////1tCmf//////W0KZ/+nn8P/////+AAAAAAAAAAD////5nYvB/1tCmf//////AAAAAP////9bQpn/W0KZ/////////////////1tCmf9fR5v//////wAAAAAAAAAAAAAAAP//////////////+wAAAADf398F//////////////94AAAAAP////v//////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////9YO5j//////wAAAAD//////////////8oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////W0KZ////////////8O71/1pBmf//////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQEAC/////1tCmf9bQpn//////1tCmf9bQpn//////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/////1o/mf9bQpn/W0KZ//////9bQpn/W0KZ///////////gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////9bQpn/W0KZ/1tCmf9bQpn/W0KZ/1tCmf9bQZn//////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAL+/vwL///////////////////////////////////////////////8AAAAAwf8AAIB/AACADwAAgAMAAIABAACMAQAAzgEAAIQBAACEAQAAxmMAAP4jAAD+AwAA/gMAAPwBAAD8AQAA/AEAAA=="
    />
    <link
      rel="stylesheet"
      href="https://unpkg.com/vue-material@beta/dist/vue-material.min.css"
    />
    <link
      rel="stylesheet"
      href="https://unpkg.com/vue-material@beta/dist/theme/default.css"
    />
  </head>
  <body>
    <div id="app">
      <div class="md-layout">
        <div class="md-layout-item md-size-100">
          <md-card class="input-card">
            <md-card-header>
              <md-card-header-text>
                <div class="md-layout md-gutter">
                  <div class="md-layout-item md-size-50">
                    <div class="md-title">
                      Jest Runner - Let's test your JS code.
                    </div>
                  </div>
                  <div class="md-layout-item md-size-50">
                    <button class="button" id="submit" v-on:click="staygo">
                      <span>{{ submitText }}</span>
                    </button>
                    <button
                      class="button"
                      v-bind:class="{ hidden: isHidden}"
                      v-bind:style="{ background: isCorrectColor}"
                    >
                      <span>{{
                        answer && answer.isComplete ? "Passed" : "Failed"
                      }}</span>
                    </button>
                  </div>
                </div>
              </md-card-header-text>
            </md-card-header>
            <md-card-content>
              <div class="md-layout md-gutter">
                <div class="md-layout-item md-size-33">
                  <md-field>
                    <label>example.js</label>
                    <md-textarea
                      style="min-height:250px;"
                      v-model="shownBlock"
                    ></md-textarea>
                  </md-field>
                </div>
                <div class="md-layout-item md-size-33">
                  <md-field>
                    <label>example.test.js</label>
                    <md-textarea
                      style="min-height:250px;"
                      v-model="editableBlock"
                    ></md-textarea>
                  </md-field>
                </div>
                <div class="md-layout-item md-size-33">
                  <md-field>
                    <label>config (npm test / npm run coverage)</label>
                    <md-textarea
                      style="min-height:250px;"
                      v-model="hiddenBlock"
                    ></md-textarea>
                  </md-field>
                </div>
              </div>
            </md-card-content>
          </md-card>
        </div>
        <div class="md-layout-item md-size-100 output-card">
          <md-card>
            <md-card-header>
              <md-card-header-text>
                <div class="md-title">Results</div>
              </md-card-header-text>
            </md-card-header>
            <md-card-content>
              <md-field>
                <md-tabs>
                  <md-tab id="tab-htmlResults" md-label="HTML results">
                    <div class="output-tab" v-html="answer.htmlFeedback"></div>
                  </md-tab>
                  <md-tab id="tab-jsonResults" md-label="JSON results">
                    <md-textarea
                      class="output-tab"
                      v-model="answer.jsonFeedback"
                      readonly
                    ></md-textarea>
                  </md-tab>
                  <md-tab id="tab-textResults" md-label="Text results">
                    <md-textarea
                      class="output-tab"
                      v-model="answer.textFeedback"
                      readonly
                    ></md-textarea>
                  </md-tab>
                </md-tabs>
              </md-field>
            </md-card-content>
          </md-card>
        </div>
      </div>
    </div>
  </body>
  <script src="https://unpkg.com/vue"></script>
  <script src="https://unpkg.com/vue-material@beta"></script>
  <script>
    Vue.use(VueMaterial.default);
    new Vue({
      el: "#app",
      data: {
        isHidden: true,
        submitText: "Submit",
        isCorrectColor: "#ff5252",
        shownBlock:
          "//example.js \\n function sum(a, b) {\\n if (a==b){\\n a=b;\\n }\\n else{\\n a=a;\\n }\\n return a + b;\\n }\\n module.exports = sum;",
        hiddenBlock: "npm run coverage",
        editableBlock:
          '//example.test.js \\n const sum = require("./example");\\n\\n test("adds 1 + 2 to equal 3", () => {\\n  expect(sum(1, 2)).toBe(4);\\n });',
        answer: ""
      },
      methods: {
        staygo: function() {
          const gatewayUrl = "";
          this.submitText = "Loading";
          this.isHidden = true;
          this.answer = "";
          fetch(gatewayUrl, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              userToken: "ABCDE",
              shown: { 0: this.shownBlock },
              editable: { 0: this.editableBlock },
              hidden: { 0: this.hiddenBlock }
            })
          })
            .then(response => {
              return response.json();
            })
            .then(data => {
              this.answer = JSON.parse(JSON.stringify(data));
              this.isHidden = false;
              this.submitText = "Submit";
              if (this.answer && this.answer.isComplete) {
                this.isCorrectColor = "green";
              } else {
                this.isCorrectColor = "#ff5252";
              }
            });
        }
      }
    });
  </script>
  <style lang="scss" scoped>
    textarea {
      font-size: 1rem !important;
    }
    .md-card-header {
      padding-top: 0px;
    }
    .md-tabs {
      width: 100%;
    }
    .md-tabs-container .md-tab textarea {
      height: 100%;
    }
    .md-tab {
      min-height: 800px;
    }
    .md-content {
      min-height: 800px;
    }
    .md-card {
      overflow: hidden;
    }
    .input-card {
      height: 350px;
    }

    .output-card > .md-card > .md-card-content > .md-field {
      padding-top: 0px;
    }

    .button {
      display: inline-block;
      border-radius: 4px;
      background-color: #0099ff;
      border: none;
      color: #ffffff;
      text-align: center;
      font-size: 20px;
      padding: 10;
      transition: all 0.5s;
      cursor: pointer;
      margin-top: 5px;
    }
    #submit span {
      cursor: pointer;
      display: inline-block;
      position: relative;
      transition: 0.5s;
    }
    #submit span:after {
      content: ">";
      position: absolute;
      opacity: 0;
      top: 0;
      right: -20px;
      transition: 0.5s;
    }
    #submit:hover span {
      padding-right: 25px;
    }
    #submit:hover span:after {
      opacity: 1;
      right: 0;
    }
    .hidden {
      display: none;
    }
    .output-tab {
      min-height: 1000px !important;
    }
  </style>
</html>
`;
  return indexPage;
}

module.exports = getContents;
