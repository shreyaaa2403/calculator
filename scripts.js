let cálculoElement = document.querySelector('.js-calculus');
cálculoElement.innerHTML = 'Hello World!';
let tamanhoRes = cálculoElement.innerHTML.length;
let cálculo = '';
let verificador = false;
var tema = localStorage.getItem('tema') || 'LIGHT';

const botaoTema = document.querySelector('.js-change-theme');
const themeIcon = document.querySelector('.js-theme-icon');
const bgColor = document.querySelector('.js-body-theme');

const mainContainer = document.querySelector('.js-main-container');

const botaoEqual = document.querySelector('.js-equal-button');
const botaoC = document.querySelector('.js-C-button');
const botaoParênteses1 = document.querySelector('.js-P1-button');
const botaoParênteses2 = document.querySelector('.js-P2-button');
const botaoDivide = document.querySelector('.js-divide-button');
const botaoMultiplica = document.querySelector('.js-mult-button');
const botaoMenos = document.querySelector('.js-menos-button');
const botaoMais = document.querySelector('.js-mais-button');

if (tema === 'DARK') {
    tema = 'LIGHT'
    alterarTema();
}

function alterarTema() {
    if (tema === 'LIGHT') {
        // console.log('Switching to DARK theme');
        tema = 'DARK'
        localStorage.setItem('tema', 'DARK');

        botaoTema.classList.add('change-theme-dark')
        botaoTema.innerHTML = (`<img src="theme-icon-sun.png" alt="light-theme-icon" style="height:17px; margin: 0px 10px;" class="theme-icon js-theme-icon">
        Change to light mode`)

        bgColor.classList.add('bodyTheme2');
        mainContainer.classList.add('main-container2');

        botaoEqual.classList.add('equal2');
        botaoParênteses1.classList.add('special2');
        botaoParênteses2.classList.add('special2');
        botaoDivide.classList.add('special2');
        botaoMultiplica.classList.add('special2');
        botaoMenos.classList.add('special2');
        botaoMais.classList.add('special2');
        botaoC.classList.add('special2');

    } else {
        // console.log('Switching to LIGHT theme');
        tema = 'LIGHT'
        localStorage.setItem('tema', 'LIGHT');

        botaoTema.classList.remove('change-theme-dark')
        botaoTema.innerHTML = (`<img src="theme-icon-moon.png" alt="dark-theme-icon" style="height:17px; margin: 0px 10px; opacity: 0.85;" class="theme-icon js-theme-icon">
        Change to dark mode`)

        bgColor.classList.remove('bodyTheme2');
        mainContainer.classList.remove('main-container2');

        botaoEqual.classList.remove('equal2');
        botaoParênteses1.classList.remove('special2');
        botaoParênteses2.classList.remove('special2');
        botaoDivide.classList.remove('special2');
        botaoMultiplica.classList.remove('special2');
        botaoMenos.classList.remove('special2');
        botaoMais.classList.remove('special2');
        botaoC.classList.remove('special2');
    }
};

function calcular(dígito) {
    if (dígito === 'C') {
        cálculo = '';
        verificador = false
        cálculoElement.innerHTML = 'Hello World!';
    } else if (cálculoElement.innerHTML.length > 80) {
        cálculoElement.innerHTML = `${cálculo}<br><br>[LIMITE-ATINGIDO]`;
    } else {
        if (dígito === ' = ') {
            if (!verificador) {
                cálculoElement.innerHTML = '';
                verificador = true
            }
            if (cálculoElement.innerHTML.includes('=')) {
                cálculo = '';
                cálculoElement.innerHTML = '';
            } else {
                try {
                    cálculoElement.innerHTML += ` = ${eval(eval(cálculo).toFixed(10))}`;
                } catch (error) {
                    cálculoElement.innerHTML += ` = ERRO`;
                }
            }
        } else {
            if (!verificador) {
                cálculoElement.innerHTML = '';
                verificador = true
            }
            if (cálculoElement.innerHTML.includes('=')) {
                // ex: 10 + 10 = 20, se depois disso ele colocar - + * / vai puxar o 20 e ficar 20 + por exemplo
                if ([' * ', ' / ', ' + ', ' - '].includes(dígito)) {
                    cálculoElement.innerHTML = eval(eval(cálculo).toFixed(10));
                    cálculo = eval(eval(cálculo).toFixed(10));
                } else {
                    cálculo = '';
                    cálculoElement.innerHTML = '';
                }
            }
            cálculo += dígito;
            cálculoElement.innerHTML += dígito;
        }
    }
    tamanhoRes = cálculoElement.innerHTML.length;;
    cálculoElement.style.fontSize = tamanhoRes >= 20 ? (tamanhoRes >= 35 ? ".8rem" : (tamanhoRes >= 50 ? ".85rem" : ".9rem")) : "1rem";
}

const keyMappings = {
    '0': '0',
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9',
    '=': ' = ',
    'Enter': ' = ',
    'c': 'C',
    'C': 'C',
    '+': ' + ',
    '-': ' - ',
    '/': ' / ',
    '*': ' * ',
    '.': '.',
    '(': ' ( ',
    ')': ' ) '
};

function detectKeyPress(event) {
    const key = event.key.toLowerCase();
    if (key in keyMappings) {
        calcular(keyMappings[key]);
    }
}
