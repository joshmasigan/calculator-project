let equation = {
    num1: null,
    operator: '',
    num2: null,
}
let startNum2Processing = false;

// const container = document.querySelector('.container');
// const calc = document.querySelector('.calc');

// calculator display
const calcDisplay = document.querySelector('.calc-display');

// C/AC button
const clearButton = document.querySelector('.clear-button');
clearButton.addEventListener('click', clearDisplay);

// operators
const operatorButtons = document.querySelectorAll('.operator-button');
operatorButtons.forEach(button => button.addEventListener('click', collectOperator));

// equals
const equalsButton = document.querySelector('.equals-button');
equalsButton.addEventListener('click', operate);

// numbers
const numberButtons = document.querySelectorAll('.number-button');
numberButtons.forEach(button => button.addEventListener('click', addToDisplay));
numberButtons.forEach(button => button.addEventListener('click', changeACToC));

// decimal
const decimalButton = document.querySelector(".decimal-button");
decimalButton.addEventListener('click', addToDisplay);

function addToDisplay(e){
    if(startNum2Processing){
        calcDisplay.textContent = '';
        startNum2Processing = false;
    }
    if(calcDisplay.textContent.length < 11){
        if(calcDisplay.textContent == '0' && e.target.textContent != '.'){
            calcDisplay.textContent = '';
            calcDisplay.textContent += e.target.textContent;
        }else{
            calcDisplay.textContent += e.target.textContent;
        }
    }
}

function changeACToC(){
    if(clearButton.textContent === 'AC'){
        clearButton.textContent = 'C';
    }
}

function clearDisplay(e){
    if(e.target.textContent === 'C'){
        calcDisplay.textContent = 0;
        e.target.textContent = 'AC';
    }else{
        resetEquation();
        console.log(equation);
    }
    
}

function collectOperator(e){ 
    // for aesthetics add highlight current selected operator -> add highlighted-operator class to operator
    if(calcDisplay.textContent && equation.operator === ''){
        equation.operator = e.target.textContent;
        equation.num1 = calcDisplay.textContent;
        startNum2Processing = true;
    }else{
        equation.num2 = calcDisplay.textContent; 
    }
    // console.log(equation.num1);
    // console.log(equation.num2)
    // console.log(equation.operator);
}


function operate(){
    equation.num2 = calcDisplay.textContent;
    const x = parseFloat(equation.num1);
    // console.log(x);
    const y = parseFloat(equation.num2);
    // console.log(y);
    const sign = equation.operator;
    // console.log(sign);

    switch (sign)
    {
        case "+":
            // console.log(x + y);
            resetEquation()
            calcDisplay.textContent = x + y;
            equation.num1 = calcDisplay.textContent;
            break;
        case "-":
            // console.log(x - y);
            resetEquation()
            calcDisplay.textContent = x - y;
            equation.num1 = calcDisplay.textContent;
            break;
        case "X":
            // console.log(x * y);
            resetEquation()
            calcDisplay.textContent = x * y;
            equation.num1 = calcDisplay.textContent;
            break;
        case"/":
            // console.log(x / y);
            resetEquation()
            calcDisplay.textContent = x / y;
            equation.num1 = calcDisplay.textContent;
            break;
        default:
            calcDisplay.textContent = "Broken";
    }
}

function resetEquation(){
    equation.num1 = null;
    equation.num2 = null;
    equation.operator = '';
}

function adjustSize(num){
    if(num.length > 12){
        if(num.includes('.')){
            let arr = num.split('.');
            // if(num[0].length > 11)
            // if(num[0].length < 11 && num[1].length > 0) -> include the entire length of non decimal up to 9 nums
        }
    }
}