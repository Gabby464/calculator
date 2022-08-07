function evaluation(operator,...args) {
    let result = 0;
    if (args.length !== 2) {
        console.log('error')
    } else {
        let a = args[0];
        let b = args[1];
        switch (operator) {
            case '+':
                result = a + b;
                break;
            case '-':
                result = a - b;
                break;
            case '*':
                result = a * b;
                break;
            case '/':
                result = a / b;
                break;
            default:
                break;
        }
        console.log(result)
    }
}
evaluation('/', -5, -9)