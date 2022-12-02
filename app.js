class PasswordGenerator {

    constructor() {
        this.resultPassword = document.querySelector('#result');
        this.clipboardButton = document.querySelector('#clipboard');
        this.lengthInput = document.querySelector('#passwordLength');
        this.uppercaseCheckbox = document.querySelector('#uppercase');
        this.lowercaseCheckbox = document.querySelector('#lowercase');
        this.numbersCheckbox = document.querySelector('#numbers');
        this.symbolsCheckbox = document.querySelector('#symbols');
        this.generateButton = document.querySelector('#generate-password');

        this.init();
    }

    init() {
        document.querySelectorAll(".options input[type='checkbox']")
        .forEach( callback => callback.addEventListener('click', this.updateOptions));

        this.generateButton.addEventListener('click', this.generatePassword);

        this.clipboardButton.addEventListener('click', this.copyToClipboard);

        this.updateOptions();
    }

    updateOptions = () => {
        const optionMethods = [];

        if (this.uppercaseCheckbox.checked)
            optionMethods.push(this.getRandomUppercase);

        if (this.lowercaseCheckbox.checked)
            optionMethods.push(this.getRandomLowercase);

        if (this.numbersCheckbox.checked)
            optionMethods.push(this.getRandomNumber);

        if (this.symbolsCheckbox.checked)
            optionMethods.push(this.getRandomSymbol);

        this.selectedMethods = optionMethods;
    }

    getRandomUppercase() {
        return String.fromCharCode(65 + Math.floor(Math.random() * 26));
    }

    getRandomLowercase() {
        return String.fromCharCode(97 + Math.floor(Math.random() * 26));
    }

    getRandomNumber() {
        return Math.floor(Math.random() * 10);
    }

    getRandomSymbol() {
        const symbols = `!@#$%^&*()_+|<>?-=`;
        return symbols[Math.floor(Math.random() * symbols.length)];
    }

    getRandomGenMethod = () => {
        const methods = this.selectedMethods;
        return methods[Math.floor(Math.random() * methods.length)];
    }

    generatePassword = () => {
        if (!this.lengthInput.value) return;
        if (this.selectedMethods.length === 0) return;

        const arrIndexes = Array.from(Array(+this.lengthInput.value).keys());

        const password = arrIndexes.map( char => {
            const method = this.getRandomGenMethod();
            return method();
        }).join('');

        this.resultPassword.innerHTML = password;
    }

    copyToClipboard = () => {
        const toCopy = this.resultPassword.innerText;
        const clipboard = navigator.clipboard;
        clipboard.writeText(toCopy).then(() => console.log('Password copied to clipboard.'))
    }
}

const passwordGenerator = new PasswordGenerator();
