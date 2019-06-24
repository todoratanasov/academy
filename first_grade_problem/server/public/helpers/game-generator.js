exports.randomDigit = (range, quantity) => {
  const min = range[0];
  const max = range[1];
  const arrNumbers = [];
  for (let index = 0; index < quantity * 2; index++) {
    const element = Math.ceil(Math.random() * (max - min) + min);
    arrNumbers.push(element);
  }
  return arrNumbers;
};
exports.createGame = (arrNumbers, operation, quantity) => {
  const problems = { gameArray: [] };
  for (let index = 0; index < quantity * 2; index += 2) {
    const firstDigit = arrNumbers[index];
    const secondDigit = arrNumbers[index + 1];
    const answer = 0;
    if (operation === "+") {
      answer = firstDigit + secondDigit;
    } else if (operation === "-") {
      answer = firstDigit - secondDigit;
    }
    const obj = {
      firstDigit,
      secondDigit,
      operation,
      answer
    };
    problems.gameArray.push(obj);
  }
  return problems;
};
