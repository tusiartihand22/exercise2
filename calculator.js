const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitForSecondOperand: false,
    operator: null,
};
  
function inputDigit(digit) {
    const { displayValue, waitForSecondOperand } = calculator;
  
    if (waitForSecondOperand === true) {
      calculator.displayValue = digit;
      calculator.waitForSecondOperand = false;
    } else {
      calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
}
  
function inputDecimal(dot) {
    if (calculator.waitForSecondOperand === true) return;
      
    if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
}
  
function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator
    const inputValue = parseFloat(displayValue);
  
    if (operator && calculator.waitForSecondOperand)  {
        calculator.operator = nextOperator;
        return;
    }
  
    if (firstOperand == null) {
        calculator.firstOperand = inputValue;
    } else if (operator) {
        const currentValue = firstOperand || 0;
        const result = performCalculation[operator](currentValue, inputValue);
  
        calculator.displayValue = String(result);
        calculator.firstOperand = result;
    }
    
    calculator.waitForSecondOperand = true;
    calculator.operator = nextOperator;
}
  
const performCalculation = {
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
  
    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
  
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
  
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
  
    '=': (firstOperand, secondOperand) => secondOperand
};
  
function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitForSecondOperand = false;
    calculator.operator = null;
}
  
function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue;
}
  
updateDisplay();
  
const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
const { target } = event;
    if (!target.matches('button')) {
        return;
    }
  
    if (target.classList.contains('operator')) {
        handleOperator(target.value);
        updateDisplay();
        return;
    }
  
    if (target.classList.contains('decimal')) {
        inputDecimal(target.value);
        updateDisplay();
        return;
    }
  
    if (target.classList.contains('clear')) {
        resetCalculator();
        updateDisplay();
        return;
    }
  
    inputDigit(target.value);
    updateDisplay();
});