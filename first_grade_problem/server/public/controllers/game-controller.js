import requester from "../helpers/requester";
import gameCreator from "../helpers/game-generator";
import storage from "../helpers/storage";
import{toggle} from "../helpers/toggle-layout";
const toastr = require("toastr");
const container = document.getElementById("container");
//gameIndexGet renders the homescreen of the game
exports.gameIndexGet = html => {
  toggle();
  container.innerHTML = html;
};
//gameSingleGet renders the options for a single game
exports.gameSingleGet = html => {
  toggle();
  container.innerHTML = html;
};
//gameSingleGenerate generates the type of the single game
exports.gameSingleGenerate = html => {
  toggle();
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
            const input = inputs[i];
            //we check if there is a whitespace in the input
            if(/\s/.test(input.value)){
              document
                .querySelector(`#game-form>div:nth-child(${i + 1})`)
                .setAttribute("class", "border-field")
              return;
            }else{
              document
                .querySelector(`#game-form>div:nth-child(${i + 1})`)
                .removeAttribute("class", "border-field")
            }
            //we check if there is an alphabetical character
            if(/[a-z]/.test(input.value.toLowerCase())){
              toastr.warning("Please don't use alpabetical in the input fields!");
              document
                .querySelector(`#game-form>div:nth-child(${i + 1})`)
                .setAttribute("class", "border-field")
              return;
            }else{
              document
                .querySelector(`#game-form>div:nth-child(${i + 1})`)
                .removeAttribute("class", "border-field")
            }
            //we check if all fields are filled
            if (!answer || !input.value) {
              toastr.warning("Please fill all fields");
              document
                .querySelector(`#game-form>div:nth-child(${i + 1})`)
                .setAttribute("class", "border-field")
              return;
            }else{
              document
                .querySelector(`#game-form>div:nth-child(${i + 1})`)
                .removeAttribute("class", "border-field")
            }
            
            //we add some icons depending on the provided answers
            if (answer === +input.value) {
              document
                .querySelector(`#game-form>div:nth-child(${i + 1})`)
                .setAttribute("class", "correct-answer")
              gameResult.correct++;
            } else {
              document
                .querySelector(`#game-form>div:nth-child(${i + 1})`)
                .setAttribute("class", "incorrect-answer")
              gameResult.incorrect++;
            }
            input.setAttribute("disabled","true");
            
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
