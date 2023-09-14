const calcScreenTop = document.querySelector(".calc-screen-top");
const calcScreenBottom = document.querySelector(".calc-screen-bottom");
// const calcScreen = document.querySelector(".calc-screen");

// const operandLeft = document.querySelector(".operandLeft");
// const operandRight = document.querySelector(".operandRight");
// const operator = document.querySelector(".operator");

let operandLeft;
let operandRight;
let operator;
let answer;

// create div that can be multiplied to be used as buttons of calc
const button = document.createElement("div");
const arrayOfButtonOperands = [9, 8, 7, 6, 5, 4, 3, 2, 1];
const arrayOfButtonsOperators = ["x", "/", "-", "+"];
const arrayOfButtonExtras = [0, "C", "="];

function add(num1, num2) {
  //   console.log(num1 + num2);
  return num1 + num2;
}

function subtract(num1, num2) {
  //   console.log(num1 - num2);
  return num1 - num2;
}

function multiply(num1, num2) {
  //console.log(num1 * num2);
  return num1 * num2;
}

function divide(num1, num2) {
  //   console.log(num1 / num2);
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
    console.log("error????"); //should maybe be return?
  }
}

// add event listener for all keys.

const numberButtons = document.querySelectorAll(
  ".calc-button, .calc-button-right "
);

numberButtons.forEach((el) =>
  el.addEventListener("click", returnClickedNumber)
);

//
function returnClickedNumber() {
  const button = this.textContent;

  if (button === "C") {
    calcScreenTop.textContent = "";
    calcScreenBottom.textContent = "0";
    operandLeft = 0;
    operandRight = 0;
    operator = 0;
  } else if (
    button === "X" ||
    button === "-" ||
    button === "/" ||
    button === "+"
  ) {
    // Left operand & operator assigned
    operandLeft = calcScreenBottom.textContent;
    operator = button;
    calcScreenBottom.textContent += ` ${button} `;
  } else if (button === "=") {
    //right operand assigned
    operandRight = calcScreenBottom.textContent.match(/\d*$/)[0];
    calcScreenBottom.textContent += ` ${button} `;
    answer = operate(operator, Number(operandLeft), Number(operandRight));
    calcScreenTop.textContent = calcScreenBottom.textContent;
    calcScreenBottom.textContent = answer;
    //////HERE//////
  } else if (calcScreenBottom.textContent === "0") {
    calcScreenBottom.textContent = button;
  } else {
    calcScreenBottom.textContent += button;
  }
}

//could set operands and operater variable before calculating. Would allow for edits beforehand
function calculate() {}
