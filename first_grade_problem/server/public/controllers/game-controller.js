import requester from "../helpers/requester";
import gameCreator from "../helpers/game-generator";
import storage from "../helpers/storage";
const toastr = require("toastr");
const container = document.getElementById("container");
exports.gameIndexGet = html => {
  container.innerHTML = html;
};
exports.gameSingleGet = html => {
  container.innerHTML = html;
};
exports.gameSingleGenerate = html => {
  const gameContainer = document.getElementById("game-container");
  const gameResult = {
    correct: 0,
    incorrect: 0
  };
  document.getElementById("singleGame").onsubmit = event => {
    event.preventDefault();
    event.stopPropagation();

    const inputs = event.target.elements;
    const range = inputs["range"].value.split("-").map(char => Number(char));
    if (range) {
      console.log("empty");
    }
    const operation = inputs["operation"].value;
    const quantity = Number(inputs["quantity"].value);
    const digitArr = gameCreator.randomDigit(range, quantity);

    const gameArr = gameCreator.createGame(digitArr, operation, quantity);
    requester
      .sendRequest("/game/playboard", "GET")
      .then(result => {
        const html = result.data;
        const htmlParsed = Mustache.to_html(html, gameArr);
        gameContainer.innerHTML = htmlParsed;

        document.getElementById("game-form").onsubmit = event => {
          event.preventDefault();
          event.stopPropagation();
          const inputs = event.target.elements;

          for (let i = 0; i < digitArr.length / 2; i++) {
            const answer = +gameArr.gameArray[i].answer;
            const input = +inputs[i].value;
            const element = document.createElement("i");
            if (!answer || !input || !element) {
              toastr.warning("Please fill all fields");
              element.setAttribute("class", "fas fa-times");
              document
                .querySelector(`#game-form>div:nth-child(${i + 1})`)
                .appendChild(element);
              return;
            }
            if (answer === input) {
              element.setAttribute("class", "fas fa-check");
              gameResult.correct++;
            } else {
              element.setAttribute("class", "fas fa-times");
              gameResult.incorrect++;
            }
            document
              .querySelector(`#game-form>div:nth-child(${i + 1})`)
              .appendChild(element);
          }
          document
            .getElementById("submit-answers")
            .setAttribute("hidden", "true");
          document.getElementById("save-result").removeAttribute("hidden");
        };
        const userId = storage.getData("userId");
        document.getElementById("save-result").addEventListener("click", () => {
          requester
            .sendRequest(`/result/add:${userId}`, "POST", gameResult)
            .then(result => {
              const statusCode = result.status;
              if (statusCode === 201) {
                window.location.href = "/";
              } else {
                console.log("Something is wrong");
              }
            });
        });
      })
      .catch(err => {
        console.log(
          `This is an error from retreiving playboard from the back-end ${err}`
        );
      });
  };
};
