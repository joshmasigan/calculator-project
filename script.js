class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear(){
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation){
        if(this.currentOperand === '') return;
        if(this.previousOperand !== ''){
            this.operate();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    operate(){
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operation){
            case '+':
            computation = prev + current;
            break;
            case '-':
            computation = prev - current;
            break;
            case '*':
            computation = prev * current;
            break;
            case '÷':
            computation = prev / current;
            break;
            default:
            return    
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    getDisplayNumber(number){
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if(isNaN(integerDigits)){
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0})
        }
        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay;
        }
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = 
        this.getDisplayNumber(this.currentOperand);
        if(this.operation != null){
            this.previousOperandTextElement.innerText = 
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('[data-equals');
const deleteButton = document.querySelector('[data-delete');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');
const clearButton = document.querySelector('[data-clear]');

const calc = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => button.addEventListener('click',() => {
    calc.appendNumber(button.innerText);
    calc.updateDisplay();
    })
);


operatorButtons.forEach(button => button.addEventListener('click',() => {
    calc.chooseOperation(button.innerText);
    calc.updateDisplay();
    })
);

clearButton.addEventListener('click', () =>{
    calc.clear();
    calc.updateDisplay();
})

equalsButton.addEventListener('click', () =>{
    calc.operate();
    calc.updateDisplay();
})

deleteButton.addEventListener('click', () =>{
    calc.delete();
    calc.updateDisplay();
})