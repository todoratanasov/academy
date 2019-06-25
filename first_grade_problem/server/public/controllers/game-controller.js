import requester from "../helpers/requester";
import gameCreator from "../helpers/game-generator";
import storage from "../helpers/storage";
const toastr = require("toastr");
const container = document.getElementById("container");
//gameIndexGet renders the homescreen of the game
exports.gameIndexGet = html => {
  container.innerHTML = html;
};
//gameSingleGet renders the options for a single game
exports.gameSingleGet = html => {
  container.innerHTML = html;
};
//gameSingleGenerate generates the type of the single game
exports.gameSingleGenerate = html => {
  const gameContainer = document.getElementById("game-container");

  const gameResult = {
    correct: 0,
    incorrect: 0
  };
  //here we retreive the playboard from the back-end and we render it
  document.getElementById("singleGame").onsubmit = event => {
    event.preventDefault();
    event.stopPropagation();
    //we get the inputs
    const inputs = event.target.elements;
    const range = inputs["range"].value.split("-").map(char => Number(char));
    const operation = inputs["operation"].value;
    const quantity = Number(inputs["quantity"].value);
    //we generate the problems and we pass them as an object to Mustache
    const digitArr = gameCreator.randomDigit(range, quantity);
    const gameArr = gameCreator.createGame(digitArr, operation, quantity);

    requester
      .sendRequest("/game/playboard", "GET")
      .then(result => {
        const html = result.data;
        const htmlParsed = Mustache.to_html(html, gameArr);
        gameContainer.innerHTML = htmlParsed;
        //we attach a functiot that checks the correct and incorrect answers
        document.getElementById("game-form").onsubmit = event => {
          event.preventDefault();
          event.stopPropagation();
          const inputs = event.target.elements;

          for (let i = 0; i < digitArr.length / 2; i++) {
            const answer = +gameArr.gameArray[i].answer;
            const input = +inputs[i].value;
            const element = document.createElement("i");
            //we check if all fields are filled
            if (!answer || !input || !element) {
              toastr.warning("Please fill all fields");
              element.setAttribute("class", "fas fa-times");
              document
                .querySelector(`#game-form>div:nth-child(${i + 1})`)
                .appendChild(element);
              return;
            }
            //we add some icons depending on the provided answers
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
          //we toggle the buttons on the form
          document
            .getElementById("submit-answers")
            .setAttribute("hidden", "true");
          document.getElementById("save-result").removeAttribute("hidden");
        };
        //we add an eventListener to the button and when is clicked a function sends a POST request the with the result as an object to the back-end
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
