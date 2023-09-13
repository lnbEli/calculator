const calcScreen = document.querySelector(".calc-screen");
const operandLeft = document.querySelector(".operandLeft");
const operandRight = document.querySelector(".operandRight");
const operator = document.querySelector(".operator");

// create div that can be multiplied to be used as buttons of calc
const button = document.createElement("div");
const arrayOfButtonOperands = [9, 8, 7, 6, 5, 4, 3, 2, 1];
const arrayOfButtonsOperators = ["x", "/", "-", "+"];
const arrayOfButtonExtras = [0, "C", "="];

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
    add(operandLeft, operandRight);
  } else if (operator === "-") {
    subtract(operandLeft, operandRight);
  } else if (operator === "*") {
    multiply(operandLeft, operandRight);
  } else if (operator === "/") {
    divide(operandLeft, operandRight);
  } else {
    console.log("error????");
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
  console.log(this.textContent);
}
