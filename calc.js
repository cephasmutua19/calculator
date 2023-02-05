// Class for all the calculator functionality
class Calculator {
    constructor(previousCalcTextElement,currentCalcTextElement){
        this.previousCalcTextElement = previousCalcTextElement;
        this.currentCalcTextElement = currentCalcTextElement;
        this.clear()
    }

    clear(){
        this.previousTextElement = '';
        this.currentTextElement = '';
        this.operation = undefined;
    }

    delete(){
        this.currentTextElement = this.currentTextElement.toString().slice(0, -1);
    }

    appendNumber(number){
        if (number === '.' && this.currentTextElement.includes('.') ) {
            return;
        }
        this.currentTextElement = this.currentTextElement.toString() + number.toString();
    }

    chooseOperation(operation){
        if(this.currentTextElement === '') return;
        if(this.previousTextElement !== ''){
            this.compute();
        }
        this.operation = operation;;
        this.previousTextElement = this.currentTextElement
        this.currentTextElement = '';

    }

    compute(){
        let computation;
        const prev = parseFloat(this.previousTextElement);
        const curr = parseFloat(this.currentTextElement);
        if(isNaN(prev) || isNaN(curr)) return;
        switch(this.operation){
            case '+':
                computation = prev + curr
                break;
            case '-':
                computation = prev - curr
                break;
            case '*':
                computation = prev * curr
                break;
            case '÷':
                computation = prev / curr
                break;
            default:
                return;
        }
        this.currentTextElement = computation;
        this.operation = undefined;
        this.previousTextElement = '';
    }

    getDisplayNumber(number){
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if(isNaN(integerDigits)){
            integerDisplay = '';
        }else {
            //Get the integer and set commas in the respective places if > 999
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0});
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        }else
        return integerDisplay;
    }

    updateDisplay(){
        this.currentCalcTextElement.innerText =
         this.getDisplayNumber(this.currentTextElement);
        if(this.operation != null){
            this.previousCalcTextElement.innerText = 
            `${this.getDisplayNumber(this.previousTextElement)} ${this.operation}`;
        }else {
            this.previousCalcTextElement.innerText = '';
        }
        
    }
}

// Initialize variables
const numberButtons = document.querySelectorAll('[data-number]'),
operationButtons = document.querySelectorAll('[data-operation]'),
equalsButton = document.querySelector('[data-equals]'),
deleteButton = document.querySelector('[data-delete]'),
allClearButton = document.querySelector('[data-all-clear]'),
previousCalcTextElement = document.querySelector('[data-previous-calc]'),
currentCalcTextElement = document.querySelector('[data-current-calc]');

let calculator = new Calculator(previousCalcTextElement, currentCalcTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.textContent);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})

