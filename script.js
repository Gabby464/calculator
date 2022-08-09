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
            //remove functionality once an operator is selected
            key.classList.add('is-depressed');
            //adding attribute to buttonDiv showing that the last clicked was an operator
            buttonsDiv.dataset.previousKey = 'operator'
            //add the firstValue and operator as attributes
            buttonsDiv.dataset.firstValue = displayedNum;
            buttonsDiv.dataset.operator = action;

        } else if (action === 'get-result') {
            buttonsDiv.dataset.previousKey = 'resultPrint'
            //get the values from the present attributes
            const firstValue = buttonsDiv.dataset.firstValue;
            const secondValue = displayedNum;
            const operator = buttonsDiv.dataset.operator;
            displayEl.textContent = calculate(firstValue, secondValue, operator)
            console.log('equal key')
        } else if (action === 'clear') {
            buttonsDiv.dataset.previousKey = 'clear'
            displayEl.textContent = ''
        } else if (action === 'go-back') {
            buttonsDiv.dataset.previousKey = 'wentBack'
            let temporaryArr = Array.from(displayedNum);
            temporaryArr.pop()
            displayEl.textContent = temporaryArr.join('')
        } else if (action === "decimal") {
            buttonsDiv.dataset.previousKey = 'decimal'
            displayEl.textContent = displayedNum + '.'
        }
    })
})

