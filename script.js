const calcScreenTop = document.querySelector(".calc-screen-top");
const calcScreenBottom = document.querySelector(".calc-screen-bottom");
let operandLeft;
let operandRight;
let operator;
let answer;
let operatorInUse = true;
let button;

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function operate(operator, operandLeft, operandRight) {
  if (operator === "+") {
    return add(operandLeft, operandRight);
  } else if (operator === "-") {
    return subtract(operandLeft, operandRight);
  } else if (operator === "X") {
    return multiply(operandLeft, operandRight);
  } else if (operator === "/") {
    return divide(operandLeft, operandRight);
  } else {
    return;
  }
}

// add event listener for all keys.
const numberButtons = document.querySelectorAll(
  ".calc-button, .calc-button-right "
);

numberButtons.forEach((el) =>
  el.addEventListener("click", returnClickedNumber)
);

function returnClickedNumber() {
  button = this.textContent;

  if (button === "C") {
    clearScreen();
    clearAllCalculatorVariables();
  } else if (
    button === "X" ||
    button === "-" ||
    button === "/" ||
    button === "+"
  ) {
    //Check if operator has alread been assigned and if it has ignores command.
    if (operator && operatorInUse) {
      return;
    } else if (operator) {
      calculateAndDisplayResults();
      updateOperatorOperandLeftAndScreen();
    } else {
      updateOperatorOperandLeftAndScreen();
    }
  } else if (button === "=") {
    if (operandLeft) {
      calculateAndDisplayResults();
    } else {
      return;
    }
  } else if (calcScreenBottom.textContent === "0") {
    calcScreenBottom.textContent = button;
  } else if (operator) {
    calcScreenBottom.textContent += button;
    operatorInUse = false;
  } else {
    calcScreenBottom.textContent += button;
  }
}

function calculateAndDisplayResults() {
  operandRight = calcScreenBottom.textContent.match(/\d*$/)[0];
  calcScreenBottom.textContent += ` = `;
  answer = operate(operator, Number(operandLeft), Number(operandRight));
  calcScreenTop.textContent = calcScreenBottom.textContent;
  if (operator === "/" && operandRight === "0") {
    calcScreenBottom.textContent = "Don't be a dafty ;)";
  } else if (calcScreenBottom.textContent.length > 16) {
    calcScreenBottom.textContent = Number.parseFloat(answer).toExponential(2);
  } else {
    calcScreenBottom.textContent = answer;
  }
  clearAllCalculatorVariables();
  operatorInUse = true;
}
function clearAllCalculatorVariables() {
  operator = "";
  operandLeft = 0;
  operandRight = 0;
}

function clearScreen() {
  calcScreenTop.textContent = "";
  calcScreenBottom.textContent = "0";
}

function updateOperatorOperandLeftAndScreen() {
  operator = button;
  operandLeft = calcScreenBottom.textContent;
  calcScreenBottom.textContent += ` ${button} `;
}
