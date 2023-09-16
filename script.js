const calcScreenTop = document.querySelector(".calc-screen-top");
const calcScreenBottom = document.querySelector(".calc-screen-bottom");
let operandLeft;
let operandRight;
let operator;
let answer;
let operatorInUse = true;
let button;
let extendedMode = "";
let startUp = true;
let decimalButtonAreadyInUSe = false;

const switchButton = document.querySelector(".extended-btn");
switchButton.addEventListener("click", addedFunctionalityToggle);

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
function addEventListenerToButtonsThatReturnsClickedNumber() {
  const numberButtons = document.querySelectorAll(
    ".calc-button, .calc-button-right "
  );

  numberButtons.forEach((el) =>
    el.addEventListener("click", returnClickedNumber)
  );
}

addEventListenerToButtonsThatReturnsClickedNumber();

function returnClickedNumber() {
  button = this.textContent;

  if (button === "C") {
    clearScreen();
    clearAllCalculatorVariables();
    decimalButtonAreadyInUSe = false;
  } else if (button === "Delete") {
    if (calcScreenBottom.textContent.slice(-1) === " ") {
      // remove 3 space characters as all operator are surrounded by a space
      calcScreenBottom.textContent = calcScreenBottom.textContent.slice(0, -3);
      operatorInUse = false;
      operator = "";
    } else if (calcScreenBottom.textContent.slice(-1) === ".") {
      calcScreenBottom.textContent = calcScreenBottom.textContent.slice(0, -1);
      decimalButtonAreadyInUSe = false;
    } else if (calcScreenBottom.textContent.length === 0) {
      calcScreenTop.textContent = "";
    } else {
      calcScreenBottom.textContent = calcScreenBottom.textContent.slice(0, -1);
    }
  } else if (button === ".") {
    if (decimalButtonAreadyInUSe) {
      return;
    } else {
      calcScreenBottom.textContent += button;
      decimalButtonAreadyInUSe = true;
    }
  } else if (
    button === "X" ||
    button === "-" ||
    button === "/" ||
    button === "+"
  ) {
    decimalButtonAreadyInUSe = false;
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
  console.log(String(answer).includes("."));
  if (String(answer).includes(".")) {
    decimalButtonAreadyInUSe = true;
  }
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

function addedFunctionalityToggle() {
  const calcButtonsBodyRight = document.querySelector(
    ".calc-buttons-body-right"
  );
  if (startUp) {
    startUp = false;
    return;
  } else if (!extendedMode) {
    //Add new button to righthand side
    const newRightButton = document.createElement("div");
    newRightButton.textContent = "Delete";
    newRightButton.classList.add("calc-button-right");
    newRightButton.classList.add("extended-mode");
    calcButtonsBodyRight.append(newRightButton);

    //Add new button to lefthand side
    const calcButtonsBody = document.querySelector(".calc-buttons-body-left");
    const newLeftButton = document.createElement("div");
    newLeftButton.textContent = ".";
    newLeftButton.classList.add("calc-button");
    newLeftButton.classList.add("calc-button-clear-equal");
    newLeftButton.classList.add("extended-mode");
    calcButtonsBody.append(newLeftButton);

    //adjust size of keypad and gap in keys
    const calcBody = document.querySelector(".calc-body");
    calcBody.style.height = "710px";
    calcButtonsBodyRight.style.gap = "2px";

    //add event listeners to new buttons
    addEventListenerToButtonsThatReturnsClickedNumber();
    extendedMode = true;
  } else if (extendedMode) {
    // Revove new button to righthand side
    let calcButtonsBodyRightToDelete = document.querySelector(".extended-mode");
    calcButtonsBodyRightToDelete.remove();

    // Remove new button to lefthand side
    calcButtonsBodyRightToDelete = document.querySelector(".extended-mode");
    calcButtonsBodyRightToDelete.remove();

    //adjust size of keypad and gap in keys
    const calcBody = document.querySelector(".calc-body");
    calcBody.style.height = "600px";
    calcButtonsBodyRight.style.gap = "7px";
    extendedMode = false;
  }
}

addedFunctionalityToggle();
