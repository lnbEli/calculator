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

const operandLeft = document.querySelector(".operandLeft");
const operandRight = document.querySelector(".operandRight");
const operator = document.querySelector(".operator");

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
