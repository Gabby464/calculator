const buttonElementsArray = Array.from(document.getElementsByClassName('buttons'));
const displayEl = document.querySelector(".user-input");
const buttonsDiv = document.querySelector(".buttons")

buttonElementsArray.forEach((button) => {
    button.addEventListener('click', (event) => {
        const key = event.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = displayEl.textContent;
        const previousKeyType = buttonsDiv.dataset.previousKey;
        // Remove .is-depressed class from all keys
        Array.from(key.parentNode.children)
            .forEach(k => k.classList.remove('is-depressed'))

        //check how to fill the display depending on the key clicked;
        if (!action) {
            buttonsDiv.dataset.previousKey = 'number'
            if (displayedNum === '0' || previousKeyType === 'operator') {
                displayEl.textContent = keyContent
            } else {
                displayEl.textContent = displayedNum + keyContent
            }
        } else if (
            action === 'sum' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
        ) {
            const firstValue = buttonsDiv.dataset.firstValue
            const operator = buttonsDiv.dataset.operator
            const secondValue = displayedNum
            //remove functionality once an operator is selected
            key.classList.add('is-depressed');
            //adding attribute to buttonDiv showing that the last clicked was an operator
            buttonsDiv.dataset.previousKey = 'operator'
            //add the firstValue and operator as attributes
            buttonsDiv.dataset.firstValue = displayedNum;
            buttonsDiv.dataset.operator = action;
            //if after 2 values an operator has been clicked -> update the result without "="
            //prepare the code for edge cases -> so that the first value is not filled in by the previous second one 
            if(firstValue && 
                operator && 
                previousKeyType === 'number') {
                calculatedValue = calculate(firstValue, secondValue, operator);
                displayEl.textContent = calculatedValue;
                buttonsDiv.dataset.firstValue = calculatedValue;
            }else{
                buttonsDiv.dataset.firstValue = displayedNum;
            }

        } else if (action === 'get-result') {
            //get the values from the present attributes
            const operator = buttonsDiv.dataset.operator;
            const firstValue = buttonsDiv.dataset.firstValue;
            const secondValue = displayedNum;
            if (firstValue && operator && previousKeyType === 'number') {
                displayEl.textContent = calculate(firstValue, secondValue, operator);
                buttonsDiv.dataset.previousKey = 'resultPrint'
            }else{
                
            }
        
        } else if (action === 'clear') {
            buttonsDiv.dataset.previousKey = 'clear'
            displayEl.textContent = ''
        } else if (action === 'go-back') {
            buttonsDiv.dataset.previousKey = 'wentBack'
            //remove the previous value entered
            let temporaryArr = Array.from(displayedNum);
            temporaryArr.pop()
            displayEl.textContent = temporaryArr.join('')
        } else if (action === "decimal") {
            //check if decimal point has been added already
            if(!displayedNum.includes('.')){
            buttonsDiv.dataset.previousKey = 'decimal'
            displayEl.textContent = displayedNum + '.'
            //check if an operator was clicked
            }else if (previousKeyType === 'operator') {
                displayEl.textContent = '0.'
              }
        }
    })
})

function calculate(n1, n2, operator){
    let result = 0;
    n1 = Number(n1);
    n2 = Number(n2);
    switch(operator){
        case "sum": result = n1 + n2; break;
        case "subtract": result = n1 - n2; break;
        case "multiply": result = n1 * n2; break;
        case "divide": result = n1 / n2; break;
    }
    return result;
}