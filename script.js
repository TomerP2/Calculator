const screenElement = document.getElementById('screen-text');
const numbersElements = document.querySelectorAll('.number');
const operatorElements = document.querySelectorAll('.operator');
const equalsElement = document.getElementById('equals');
const clearElement = document.getElementById('clear');

let firstNum = null;
let secondNum = null;
let currentNumStr = '';
let operator = null;
let res = null;

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

//---Upon clicking a digit button---
numbersElements.forEach(numberElement => {
    numberElement.addEventListener('click', function() {
        if (res && !operator) {
            clearAll();
        };
        let selectedDigit = this.textContent.replace(/\s+/g, '');
        screenElement.textContent += selectedDigit;
        currentNumStr += selectedDigit;
    })
});

// - Upon clicking an operator button:
operatorElements.forEach(operatorElement => {
    operatorElement.addEventListener('click', function() {
        //Check if there are numbers
        if (currentNumStr === '') {
            return;
        }
        //Check if there is already an operator or a result present
        if (operator) {
            calculateRes();
            firstNum = res;
        } else if (res) {
            firstNum = res;
        } else {
            firstNum = parseInt(currentNumStr);
        }
        operator = getOperator(this.textContent);
        screenElement.textContent += this.textContent;
        currentNumStr = '';
    })
});

// - Upon clicking 'equals' button:

function calculateRes() {
    secondNum = parseInt(currentNumStr);
    res = operate(operator, firstNum, secondNum);
    res = Math.round(res * (10 ** 10)) / (10 ** 10);
    firstNum = null;
    secondNum = null;
    operator = null;
    screenElement.textContent = res.toString();
}

equalsElement.addEventListener('click', function() {
    calculateRes();
});

// - Upon clicking 'Clear' button:

function clearAll() {
    screenElement.textContent = '';
    currentNumStr = '';
    firstNum = null;
    secondNum = null;
    operator = null;
    res = null;
}

clearElement.addEventListener('click', function() {
    clearAll()
});