const cal = {
    displayNumber: "0",
    operator: null,
    firstNumber: null,
    waitingForSecondNumber: false
};

function updateDisplay() {
    document.querySelector("#displayNumber").innerText = cal.displayNumber;
}

function clearCal() {
    cal.displayNumber = '0';
    cal.operator = null;
    cal.firstNumber = null;
    cal.waitingForSecondNumber = false;
}

function inputNum(digit) {
    if(cal.displayNumber === '0'){
        cal.displayNumber = digit;
    }else{
        cal.displayNumber += digit;
    }
}

function inverseNumber() {
    if (cal.displayNnumber === '0') {
        return;
    }
    cal.displayNumber = cal.displayNumber * -1;
}

function handleOperator(operator) {
    if (!cal.waitingForSecondNumber){
        cal.operator = operator;
        cal.waitingForSecondNumber = true
        cal.firstNumber = cal.displayNumber;
    }else{
        alert("Operator Sudah Dijalankan");
    }
}

function inputNum(digit) {
    if (cal.waitingForSecondNumber && cal.firstNumber === cal.displayNumber) {
        cal.displayNumber = digit;
    }else{
        if (cal.displayNumber === '0') {
            cal.displayNumber = digit;
        } else {
            cal.displayNumber += digit;
        }
    }
}

function performCal() {
    if (cal.firstNumber == null || cal.waitingForSecondNumber == null) {
        alert("Anda belum menentukan operasi");
        return;
    }

    let result = 0;
    if (cal.operator === "+") {
        result = parseInt(cal.firstNumber) + parseInt(cal.displayNumber);
    }else{ 
        result = parseInt(cal.firstNumber) - parseInt(cal.displayNumber);
    }

    // object yang akan dikirim sebagai argumen fungsi putHistory()
    const history = {
        firstNumber: cal.firstNumber,
        secondNumber: cal.displayNumber,
        operator: cal.operator,
        result: result
    }

    putHistory(history);
    cal.displayNumber = result;
    renderHistory();
}

const buttons = document.querySelectorAll(".button");
for (let button of buttons) {
    button.addEventListener('click', function(event){

        // mendapatkan target elemen yang diklik
        const target = event.target;

        if (target.classList.contains('clear')) {
            clearCal();
            updateDisplay();
            return;
        }

        if (target.classList.contains('negative')) {
            inverseNumber();
            updateDisplay();
            return;
        }

        if (target.classList.contains('equal')) {
            performCal();
            updateDisplay();
            return;
        }

        if (target.classList.contains('operator')) {
            handleOperator();
            updateDisplay();
            return;
        }
        
        inputNum(target.innerText);
        updateDisplay();
    });
}