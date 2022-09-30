const buttons = document.querySelector('#buttons');
const screen = document.querySelector('#screen');
let numberOne = null;
let numberTwo = null;
let operator = null;
let prevAction = null;
window.addEventListener('keydown', (evt) => {
    console.log(evt.code);
    switch (evt.code) {
        case "Digit1":
            numericalSelected(1);
            break;
        case "Digit2":
            numericalSelected(2);
            break;
        case "Digit3":
            numericalSelected(3);
            break;
        case "Digit4":
            numericalSelected(4);
            break;
        case "Digit5":
            numericalSelected(5);  
            break;
        case "Digit6":
            numericalSelected(6);    
            break; 
        case "Digit7":
            numericalSelected(7);    
            break;
        case "Digit8":
            numericalSelected(8);
            break;
        case "Digit9":
            numericalSelected(9);
            break;
        case "Digit0":
            numericalSelected(0);
            break;
        case "Minus":
            checkFunction('substract');
            break;
        case "Slash":
            checkFunction('divide');
            break;
        case "KeyX":
            checkFunction('divide');
            break;
        case "KeyC":
            checkFunction('clear');
            break;
        case "Equal":
            checkFunction('add');
            break;
        case "Enter":
            checkFunction('equals');
            break;
    }
});

buttons.addEventListener('click', (e) => { //listening to buttons ('click')
    const targetButton = e.target;
    if (targetButton.getAttribute('id') != 'buttons') listening(targetButton);
});

const listening = function(targetButton) {
    if (targetButton.classList.contains('functional')) {
        console.log(targetButton);
        checkFunction(targetButton.getAttribute('id'));
    }
    else {
        numericalSelected(targetButton.getAttribute('id'));
    }
}
 
const checkFunction = function(buttonAction) {
    switch (buttonAction) {
        case 'clear': 
            numberOne = null;
            numberTwo = null;
            operator = null;
            screen.textContent = '0';
            console.log('clear');
            break;
        case 'add':
            if (!!numberOne && !!numberTwo && !!operator) executeCalculation();
            operator = 'add';
            numberOne = screen.textContent;
            console.log(numberOne+operator);
            prevAction = 'add';
            break;
        case 'divide':
            if (!!numberOne && !!numberTwo && !!operator) executeCalculation();
            operator = 'divide';
            numberOne = screen.textContent;
            console.log(numberOne+operator);
            prevAction = 'divide';
            break;
        case 'multiply':
            if (!!numberOne && !!numberTwo && !!operator) executeCalculation();
            operator = 'multiply';
            numberOne = screen.textContent;
            console.log(numberOne+operator);
            prevAction = 'multiply';
            break;
        case 'substract':
            if (!!numberOne && !!numberTwo && !!operator) executeCalculation();
            numberOne = screen.textContent;
            console.log(numberOne+operator);
            prevAction = 'substract';
            operator = 'substract';
            break;
        case 'equals':
            prevAction = operator;
            if (!!numberOne && !!numberTwo && !!operator) { executeCalculation(); } 
            break;
        case 'comma':
            !screen.textContent.includes('.') ? screen.textContent += '.' : screen.textContent = screen.textContent;
            break;
        case 'plusMinus':
            screen.textContent = -parseFloat(screen.textContent) ///////stooppppeeddd heereee
            console.log(numberOne, numberTwo);
            if (!!numberOne) numberTwo = screen.textContent;
            break;
        default: 
            executeCalculation(); 
    }
}

const numericalSelected = function(number) {
    screen.textContent === '0' ? screen.textContent = number : screen.textContent += number;
    if (!!numberOne) {
        if (!!prevAction) { screen.textContent = number; prevAction = null; }
        numberTwo = screen.textContent;
        console.log('no2: '+numberTwo);
    }
}

const executeCalculation = function() {
    switch (operator) {
        case 'add':
            numberOne = parseFloat(numberOne) + parseFloat(numberTwo);
            numberTwo = null;
            operator = null;
            prevAction = 'add';
            break;
        case 'divide':
            if (numberTwo === '0') { 
                numberOne = 'WTF?'; 
                numberTwo = null;
                operator = null;
                prevAction = 'divide';
                break;
            }
            numberOne = parseFloat(numberOne) / parseFloat(numberTwo);
            numberTwo = null;
            operator = null;
            prevAction = 'divide';
            break;
        case 'multiply':
            numberOne = parseFloat(numberOne) * parseFloat(numberTwo);
            numberTwo = null;
            operator = null;
            prevAction = 'multiply';
            break;
        case 'substract':
            numberOne = parseFloat(numberOne) - parseFloat(numberTwo);
            numberTwo = null;
            operator = null;
            prevAction = 'substract';
            break;
    }
    screen.textContent = new Intl.NumberFormat("en-US", {  //allowing for max 6 decimals
        style: "decimal",
        maximumFractionDigits: 6,
    }).format(numberOne);
}