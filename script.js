const buttonElementsArray = Array.from(document.getElementsByClassName('buttons'));
const displayEl = document.querySelector(".user-input");

buttonElementsArray.forEach((button) => {
    button.addEventListener('click', (event) => {
        const key = event.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = displayEl.textContent;


        //checks that detirmine the type of button clicked
        if (!action) {
            console.log('number key')
        }else if (
            action === 'sum' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
        ) {
            console.log('operator key!')
        }else if(action === 'get-result'){
            console.log('equal key')
        }else if(action === 'clear'){
            console.log('clear key')
        }else if(action === 'go-back'){
            console.log('go back key')
        }else if(action === "decimal"){
            console.log('decimal key')
        }
    })
})