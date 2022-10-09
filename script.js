const buttons = document.querySelector('#buttons');
const screen = document.querySelector('#screen');
const cal = {
    operandOne: null,
    operandTwo: null,
    operation: null,
    operandTwoPending: true,
    tempoperand: null,
    displayToBeErased: false,
}

buttons.addEventListener('click', evt => {
    const clickedButton = evt.target;
    if (clickedButton.id != 'buttons') {
    clickedButton.classList.contains('functional') ? functionCall(clickedButton) : numberCall(clickedButton.innerText);
    }
});

const numberCall = function(number) {
    if (screen.innerText.length < 9) {
    if (screen.innerText === '0') {
        screen.innerText = number;
    }
    else if (cal.displayToBeErased === true) {
        screen.innerText = number;
        cal.displayToBeErased = false;
        cal.operandTwoPending = false;
    }
    else {
        screen.innerText += number;
        if (!!cal.operandOne) cal.operandTwoPending = false;
    }
    }
}

const functionCall = function(operation) {
    if (operation.classList.contains('math')) {
        //wszystkie operacje dod,odej,mnoz, dzielenia
        if (!cal.operandOne) {
            //jesli nie ma pierwszego czlona
            cal.operation = operation.innerText;
            cal.operandOne = screen.innerText;
            cal.displayToBeErased = true;
            console.table(cal);
        }
        else if (!!cal.operandOne && !!cal.operation && cal.operandTwoPending === true) {
            cal.operation = operation.innerText;
            console.table(cal);
        }
        else if (!!cal.operandOne && !!cal.operation && cal.operandTwoPending === false) {
            cal.operandTwo = screen.innerText;
            cal.tempoperand = cal.operandOne; //moze sie przyda
            console.table(cal);
            screen.innerText = calculate(); //OSTATNIA ZMIANA
            cal.displayToBeErased = true;
            cal.operandTwoPending = true;
            cal.operandOne = screen.innerText;
        }
        cal.operation = operation.innerText;
        
    }
    if (operation.innerText === '=' && !!cal.operandOne) { //MAMY pierwszy operator i operation
        if (cal.operandTwoPending === false) {
        cal.operandTwo = screen.innerText;
        cal.tempoperand = cal.operandOne;
        screen.innerText = calculate();
        cal.displayToBeErased = true;
        cal.operandTwoPending = true;
        cal.operandOne = screen.innerText;
        return;
        }
        if (cal.operandTwoPending === true) {
            screen.innerText = calculate();
            cal.operandOne = screen.innerText;

        }
    }
    if (operation.innerText === 'C') { 
        cal.operandOne = null;
        cal.operandOne = null;
        cal.operandTwo = null;
        cal.operation = null;
        cal.operandTwoPending = true;
        cal.tempoperand = null;
        cal.displayToBeErased = false;
        screen.innerText = '0';
    }
    if (operation.innerText === '.') { 
        if (screen.innerText === '0') {
            screen.innerText = '0.';
        }
        if (!screen.innerText.includes('.')) {
            screen.innerText += '.';
        }
        if (!!cal.operandOne && cal.operandTwoPending === true) {
            screen.innerText = '0.'
            cal.displayToBeErased = false;
        }
    }
    if (operation.innerText === '+/-') { 
        screen.innerText = -screen.innerText;
        if (!!cal.operandOne) cal.operandOne = screen.innerText;
    }
}

const calculate = function(operation) {
    let result = null;
    if (cal.operation === '+') result = parseFloat(cal.operandOne) + parseFloat(cal.operandTwo);
    if (cal.operation === '-') result = parseFloat(cal.operandOne) - parseFloat(cal.operandTwo);
    if (cal.operation === '/') result = parseFloat(cal.operandOne) / parseFloat(cal.operandTwo);
    if (cal.operation === 'x') result = parseFloat(cal.operandOne) * parseFloat(cal.operandTwo);
    result = result.toString();
    if (result.length < 9) return result;
    else {
        result = parseFloat(result).toExponential(2);
        return result;
    }

}

/* add keyboard support
change names of operand to oPerand
error message when dividing by zero
highlight the operation that is being selected
great design (full screen?)
DONE changing the sign (+/-) of a result should save it (UPDATE) as a new operandOne
history of inputs  */