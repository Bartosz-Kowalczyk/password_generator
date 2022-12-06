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

        this.lengthInputArea = document.querySelector('.password-length');
        this.optionsInputArea = document.querySelector('.options');
        this.passwordsHistory = document.querySelector('#passwords-history');

        this.init();
    }

    init() {
        document.querySelectorAll(".options input[type='checkbox']")
        .forEach( callback => callback.addEventListener('click', this.updateOptions));

        this.generateButton.addEventListener('click', this.generatePassword);

        this.clipboardButton.addEventListener('click', this.copyToClipboard);
        console.log(this.historyPasswordButton);

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
        const symbols = `!@#$%^&*()_+|?-=`;
        return symbols[Math.floor(Math.random() * symbols.length)];
    }

    getRandomGenMethod = () => {
        const methods = this.selectedMethods;
        return methods[Math.floor(Math.random() * methods.length)];
    }

    removeAllActivated = () => {
        this.lengthInputArea.onanimationend = () => {
            this.lengthInputArea.classList.remove('activated');
        }
        this.optionsInputArea.onanimationend = () => {
            this.optionsInputArea.classList.remove('activated');
        }
    }

    moveToHistory = (password) => {
        const id = 0;
        this.element = document.createElement('li');
        this.passwordsHistory.appendChild(this.element);

        const historyLine = `<button class="small-btn" id="pass${id}">${password.textContent}</button>`;

        this.element.innerHTML = historyLine;
    }

    generatePassword = () => {

        let isOptionSet = true;

        if (!this.lengthInput.value || this.lengthInput.value === '0') {
            this.lengthInputArea.classList.add('activated');
            isOptionSet = false;
        }

        if (this.selectedMethods.length === 0) {
            this.optionsInputArea.classList.add('activated');
            isOptionSet = false;
        }

        this.removeAllActivated();

        if (!isOptionSet) return;

        const arrIndexes = Array.from(Array(+this.lengthInput.value).keys());

        const password = arrIndexes.map( char => {
            const method = this.getRandomGenMethod();
            return method();
        }).join('');

        this.resultPassword.innerHTML = password;
        this.moveToHistory(this.resultPassword);
        this.addButtonListeners();
    }

    addButtonListeners = () => {
        this.historyPasswordButton = document.querySelectorAll('.small-btn');
        this.historyPasswordButton.forEach( button => addEventListener('click', this.copyHistoricToClipboard(button.childNodes)));
    }

    copyToClipboard = () => {
        const toCopy = this.resultPassword.innerText;
        const clipboard = navigator.clipboard;
        clipboard.writeText(toCopy);
    }

    copyHistoricToClipboard = (buttons) => {
        console.log(button[0].data);
        const toCopy = button.text.nodeValue;
        console.log(toCopy);
        const clipboard = navigator.clipboard;
        clipboard.writeText(toCopy);
    }
}

const passwordGenerator = new PasswordGenerator();

