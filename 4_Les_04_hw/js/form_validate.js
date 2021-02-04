'use strict';

// 3. * Создать форму обратной связи с полями: Имя, Телефон, E-mail, текст, кнопка Отправить.
//    При нажатии на кнопку Отправить произвести валидацию полей следующим образом:
// a. Имя содержит только буквы.
// b. Телефон имеет вид +7(000)000-0000.
// c. E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru.
// d. Текст произвольный.
// e. Если одно из полей не прошло валидацию, необходимо выделить это поле красной рамкой и сообщить пользователю об ошибке.

function validForm(element) {
    if (!element.value) {
        element.className = "";
        setClrBtnVisibility(element, "hidden");
        return;
    }

    setClrBtnVisibility(element, "unset");

    if (element.name == "fullname") { validateFullname(element); }
    if (element.name == "phone") { validatePhone(element); }
    if (element.name == "email") { validateEmail(element); }
    if (element.name == "comment") { validateText(element); }
}

function validateFullname(element) {
    // 1 Поиск запрещенных символов
    let regexp = /[^a-zа-яё -]/ig;
    let notAllowed = regexp.test(element.value);

    // 2 Решение
    if (notAllowed) { element.className = "err"; return; }

    let okForm = /^(([a-zа-яё]+-[a-zа-яё]+)|([a-zа-яё]+)) (([a-zа-яё]+-[a-zа-яё]+)|([a-zа-яё]+)) (([a-zа-яё]+-[a-zа-яё]+)|([a-zа-яё]+))$/ig.test(element.value);
    // формат ниже не учитывает кириллицу
    // let okForm = /^((\w+-\w+)|(\w+)) ((\w+-\w+)|(\w+)) ((\w+-\w+)|(\w+))$/ig.test(element.value);

    okForm ? element.className = "ok" : element.className = "err";
}

function validatePhone(element) {
    // 1 Поиск запрещенных символов
    let regexp = /[^\d\+\(\)-]/ig;
    let notAllowed = regexp.test(element.value);

    // 2 Решение
    if (notAllowed) { element.className = "err"; return; }

    // пользователь вводит только цифры, а форма дописывает разрешенные НЕ-цифры:
    element.value = element.value.replace(/^\d/, '+7(')
                                 .replace(/(^\+7\(\d{3})/, '$1)')
                                 .replace(/\)+/, ')')
                                 .replace(/(^\+7\(\d{3}\)\d{3})/, '$1-')
                                 .replace(/\-+/, '-')
                                 .replace(/(^\+7\(\d{3}\)\d{3}-\d{4})/, '$1')
                                 .slice(0,15);

    (element.value.length < 15) ? element.className = "err" :  element.className = "ok";
}

function validateEmail(element) {
    // 1 Поиск запрещенных символов
    let regexp = /[^a-z0-9\.@-]/ig;
    let notAllowed = regexp.test(element.value);

    // 2 Решение
    if (notAllowed) { element.className = "err"; return; }

    let okForm = /^((\w+(\.|-)\w+)|(\w+))@(\w+)\.([a-z]{2})$/ig.test(element.value);

    okForm ? element.className = "ok" : element.className = "err";
}

function validateText(element) {
    // 1 Поиск запрещенных символов
    let regexp = /[\n\<\>]/ig;
    let notAllowed = regexp.test(element.value);

    // 2 Решение
    notAllowed ? element.className = "err" : element.className = "ok";
}

function putClrBtnHandler() {
    let btns = document.querySelectorAll(".clrbtn");

    let inputClear = element => {
        let input = element.target.parentElement.firstElementChild;
        if (!input.value) { return; }
    
        input.value = "";
        input.className = "";
        element.target.setAttribute("style", "visibility: hidden;")
    }

    btns.forEach(element => { element.addEventListener("click", inputClear); });
}

function setClrBtnVisibility(element, state) {
    element.parentElement.lastElementChild.setAttribute("style", `visibility: ${state};`);
}

putClrBtnHandler();