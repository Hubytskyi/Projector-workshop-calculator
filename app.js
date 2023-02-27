"use strict";

// 11. Workshop - Calculator

// оголошуємо змінні
const input = document.querySelector('.input');
const numbers = document.querySelectorAll('.number');
const result = document.querySelector('.result');
const clear = document.querySelector('.clear');
const operators = document.querySelectorAll('.operator');

let isResultDisplayed = false;

// функції по роботі з операторами
// функція результату
// функція очищення
// функція по роботі з цифрами

// додамо обробники подій для всіх кнопок з математичними операторами
operators.forEach((operator) => {
    operator.addEventListener('click', (event) => {
        // отримуємо доступ до значення всередині інпута
        const inputValue = input.innerHTML;
        // отримуємо доступ до останнього елемента інпута (останній елемент строки)
        const lastChar = inputValue[inputValue.length - 1];

        if (inputValue.length === 0) {
            // якщо юзер першим символом ввів оператор, то ми нічого не будемо робити
            return null;
        } else if (lastChar === "+" || lastChar === '-'|| lastChar === '×'|| lastChar === '÷' || lastChar === '.') {
            // якщо юзер вже ввів математичний оператор останнім значенням 
            // то ми його замінюємо
            const newString = inputValue.substring(0, inputValue.length - 1) + event.target.innerHTML;
            input.innerHTML = newString;
        } else {
            // у всіх інших випадках - додаємо оператор до кінця рядку
            input.innerHTML += event.target.innerHTML
        }
     })
})

// додамо обробники подій для всіх кнопок з цифрами
numbers.forEach((number) => {
    number.addEventListener('click', (event) => {
    // отримуємо доступ до значення всередині інпута
    const inputValue = input.innerHTML;
    // отримуємо доступ до останнього елемента інпута (останній елемент строки)
    const lastChar = inputValue[inputValue.length - 1];

        if (isResultDisplayed === false) {
            // якщо юзер просто вводить число - то ми його додаємо до введеної операції
            input.innerHTML += event.target.innerHTML
        } else if (isResultDisplayed === true && lastChar === "+" || lastChar === '-'|| lastChar === '×'|| lastChar === '÷' || lastChar === '.') {
            // якщо юзер вводить число коли вже висвічується результат попередньої операції і є оператор останнім символом
			// введене число додаємо до введеної операції
            input.innerHTML += event.target.innerHTML;
            // ставимо позначку що це вже не результат попередньої введеної операції
            isResultDisplayed = false
        } else {
            // якщо юзер вводить число коли відображається результат попередньої операції
            // вставляємо введене число
            input.innerHTML += event.target.innerHTML;
            // очищуємо значення в рядку
            input.innerHTML = '';
            // ставимо позначку що це вже не результат попередньої введеної операції
            isResultDisplayed = false
        }
    })
})

clear.addEventListener('click', () => {
    // очищуємо значення в рядку
    input.innerHTML = '';
})

result.addEventListener('click', () => {
    // отримуємо доступ до значення всередині інпута
    const inputValue = input.innerHTML;
    // отримуємо доступ до останнього елемента інпута (останній елемент строки)
    const lastChar = inputValue[inputValue.length - 1];

    // якщо юзер останнім символом ввів оператор і натискає на отримання результату
    if (lastChar === "+" || lastChar === '-'|| lastChar === '×'|| lastChar === '÷' || lastChar === '.') {
        return null
    }
    // отримуємо масив всіх введених чисел      
    const onlyNumbers = inputValue.split(/\+|\-|\×|\÷/g);
    // отримуємо масив всіх введених операторів (їх завжди менше на один ніж введених чисел)
    const onlyOperators = inputValue.replace(/[0-9]|\./g, '').split('');

    // ділення
    // 1+4*5-6-8/2 
    // [1,4,5,6,8,2] - onlyNumbers
    // [+,*,-,-,/] - onlyOperators
    // dividerIndex = 4
    // const nums = [1,4,5,6,8,2] - onlyNumbers;
    // nums.splice(4, 2, 8 / 2) - де 4 - це dividerIndex, 2 - кількість елементів які потрібно замінити включно з dividerIndex, 8 / 2 - результат того, на що міняємо

    // проведемо всі операції множення для введеної операції
    // знаходимо перший оператор множення серед всіх операторів
    let dividerIndex = onlyOperators.indexOf('÷');
    // доки оператор ділення є у масиві операторів
    while(dividerIndex !== -1) {
        // знаходимо у масиві значення чисел які знаходяться після цього оператора
        // і замінюємо їх на результат їх перемноження
        onlyNumbers.splice(dividerIndex, 2, onlyNumbers[dividerIndex] / onlyNumbers[dividerIndex + 1]);
        // видаляємо цей оператор множення з масиву операторів
        onlyOperators.splice(dividerIndex, 1);
        // знаходимо наступний оператор множення серед всіх операторів
        dividerIndex = onlyOperators.indexOf('÷');
    }

    // множення
    let multiplyIndex = onlyOperators.indexOf('×');
    while(multiplyIndex !== -1) {
        onlyNumbers.splice(multiplyIndex, 2, onlyNumbers[multiplyIndex] * onlyNumbers[multiplyIndex + 1]);
        onlyOperators.splice(multiplyIndex, 1);
        multiplyIndex = onlyOperators.indexOf('×');
    }

    // віднімання
    let subtractIndex = onlyOperators.indexOf('-');
    while(subtractIndex !== -1) {
        onlyNumbers.splice(subtractIndex, 2, onlyNumbers[subtractIndex] - onlyNumbers[subtractIndex + 1]);
        onlyOperators.splice(subtractIndex, 1);
        subtractIndex = onlyOperators.indexOf('-');
    }

    // додаваеея
    let addIndex = onlyOperators.indexOf('+');
    while(addIndex !== -1) {
        // перетворюємо строку в число за допомогою parseInt, тому що оператор "+"" робить конкатенацію рядків
        onlyNumbers.splice(addIndex, 2, parseInt(onlyNumbers[addIndex]) + parseInt(onlyNumbers[addIndex + 1]));
        onlyOperators.splice(addIndex, 1);
        addIndex = onlyOperators.indexOf('+');
    }

    // замінюємо значення введеної операції на її результат
    input.innerHTML = onlyNumbers[0];
    // ставимо позначку що це вже результат попередньої введеної операції
    isResultDisplayed = true;

})
