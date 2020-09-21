const cancelButton = document.querySelector(".cancel-button");
const deleteButton = document.querySelector(".delete-button");
const divideButton = document.querySelector(".divide-button");
const inverseButton = document.querySelector(".inverse-button");
const squareButton = document.querySelector(".square-button");
const squareRootButton = document.querySelector(".square-root-button");
const multiplyButton = document.querySelector(".multiply-button");
const sevenButton = document.querySelector(".seven-button");
const eightButton = document.querySelector(".eight-button");
const nineButton = document.querySelector(".nine-button");
const subtractButton = document.querySelector(".subtract-button");
const fourButton = document.querySelector(".four-button");
const fiveButton = document.querySelector(".five-button");
const sixButton = document.querySelector(".six-button");
const plusButton = document.querySelector(".plus-button");
const oneButton = document.querySelector(".one-button");
const twoButton = document.querySelector(".two-button");
const threeButton = document.querySelector(".three-button");
const negateButton = document.querySelector(".negate-button");
const zeroButton = document.querySelector(".zero-button");
const decimalButton = document.querySelector(".decimal-button");
const equalsButton = document.querySelector(".equals-button");

const calculatorEval = document.querySelector(".calculator-eval");
const calculatorDisplay = document.querySelector(".calculator-display");

let prevNum = "";
let op = "";
let buffer = "0";
let decimal = false;

calculatorDisplay.innerHTML = buffer;

const numHandler = (e) => {
  const btn = e.currentTarget;

  if (op === "=") {
    calculatorEval.innerHTML = "";
    buffer = "";
    op = "";
  } else if (op !== "") {
    prevNum = buffer;
    buffer = "";
  }
  
  if (buffer === "0") buffer = "";
  
  buffer += btn.dataset["num"];
  calculatorDisplay.innerHTML = buffer;

  if (op !== "") {
    calculatorEval.innerHTML = `${ prevNum }${ op }${ buffer }=`;
  }
};

sevenButton.addEventListener("click", numHandler);
eightButton.addEventListener("click", numHandler);
nineButton.addEventListener("click", numHandler);
fourButton.addEventListener("click", numHandler);
fiveButton.addEventListener("click", numHandler);
sixButton.addEventListener("click", numHandler);
oneButton.addEventListener("click", numHandler);
twoButton.addEventListener("click", numHandler);
threeButton.addEventListener("click", numHandler);
zeroButton.addEventListener("click", numHandler);

deleteButton.addEventListener("click", () => {
  if (buffer[buffer.length - 1] === ".") decimal = false;
  buffer = buffer.substr(0, buffer.length - 1);
  if (buffer.length === 0) buffer = "0";
  calculatorDisplay.innerHTML = buffer;
});

decimalButton.addEventListener("click", () => {
  if (decimal) return;
  decimal = true;
  buffer += ".";
  calculatorDisplay.innerHTML = buffer;
});

const evaluate = () => {
  switch(op) {
    case "+":
      return `${ parseFloat(prevNum) + parseFloat(buffer) }`;
    case "-":
      return `${ parseFloat(prevNum) - parseFloat(buffer) }`;
    case "*":
      return `${ parseFloat(prevNum) * parseFloat(buffer) }`;
    case "/":
      return `${ parseFloat(prevNum) / parseFloat(buffer) }`;
  }
};

equalsButton.addEventListener("click", () => {
  const ans = evaluate();
  calculatorEval.innerHTML = `${ prevNum }${ op }${ buffer }=${ ans }`;
  buffer = ans;
  op = "=";
  prevNum = "";
  calculatorDisplay.innerHTML = buffer;
});

const operatorHandler = e => {
  const btn = e.currentTarget;
  if (prevNum !== "") buffer = evaluate();
  op = btn.dataset["op"];
  calculatorDisplay.innerHTML = buffer;
  calculatorEval.innerHTML = `${ buffer }${ op }`;
};

divideButton.addEventListener("click", operatorHandler);
multiplyButton.addEventListener("click", operatorHandler);
subtractButton.addEventListener("click", operatorHandler);
plusButton.addEventListener("click", operatorHandler);

cancelButton.addEventListener("click", () => {
  buffer = "0";
  op = "";
  prevNum = "";
  calculatorDisplay.innerHTML = buffer;
  calculatorEval.innerHTML = "";
});

negateButton.addEventListener("click", () => {
  if (buffer === "0") return;

  if (buffer[0] === "-") {
    buffer = buffer.substr(1);
  } else {
    buffer = "-" + buffer;
  }
  
  calculatorDisplay.innerHTML = buffer;
});

inverseButton.addEventListener("click", () => {
  if (buffer === "0") return;

  buffer = `${ 1 / parseFloat(buffer) }`;

  calculatorDisplay.innerHTML = buffer;
});

squareButton.addEventListener("click", () => {
  buffer = `${ parseFloat(buffer) * parseFloat(buffer) }`;
  calculatorDisplay.innerHTML = buffer;
});

squareRootButton.addEventListener("click", () => {
  buffer = `${ Math.sqrt(parseFloat(buffer)) }`;
  calculatorDisplay.innerHTML = buffer;
});
