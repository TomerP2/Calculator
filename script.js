const screenElement = document.getElementById('screen-text');
const numbersElements = document.querySelectorAll('.number');
const operatorElements = document.querySelectorAll('.operator');
const equalsElement = document.getElementById('equals');
const clearElement = document.getElementById('clear');

let firstNum = null;
let secondNum = null;
let currentNumStr = '';
let operator = null;



//--- Basic arigmethic functions ---
function add(a, b) {
    return a + b;
};

function subtract(a, b) {
    return a - b;
};

function multiply(a, b) {
    return a * b;
};

function divide(a, b) {
    return a / b;
};

function operate(operator, a, b) {
    return operator(a, b);
};

//---Upon clicking a digit button---
//Display digit on screen
//Add digit to currentNumStr
function addNumberToScreen(numberElement) {
    let selectedDigit = numberElement.textContent.replace(/\s+/g, '');
    screenElement.textContent += selectedDigit;
};

numbersElements.forEach(numberElement => {
    numberElement.addEventListener('click', function() {
        addNumberToScreen(this);
        currentNumStr += this.textContent.replace(/\s+/g, '');
    })
});

// - Upon clicking an operator button:

function getOperator(string) {
    string = string.replace(/\s+/g, '');
    switch (string) {
        case '*':
            return multiply;
        case '/':
            return divide;
        case '+':
            return add;
        case '-':
            return subtract;
    }
};

operatorElements.forEach(operatorElement => {
    operatorElement.addEventListener('click', function() {
        firstNum = parseInt(currentNumStr);
        operator = getOperator(this.textContent);
        screenElement.textContent += this.textContent;
        currentNumStr = '';
    })
});

// - Upon clicking 'equals' button:

equalsElement.addEventListener('click', function() {
    secondNum = parseInt(currentNumStr);
    let res = operate(operator, firstNum, secondNum);
    screenElement.textContent = res.toString();
});

// - Upon clicking 'Clear' button:

clearElement.addEventListener('click', function() {
    screenElement.textContent = '';
    currentNumStr = '';
    firstNum = null;
    secondNum = null;
    operator = null;
});