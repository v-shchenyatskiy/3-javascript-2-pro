'use strict';

// 1. Дан большой текст, в котором для оформления прямой речи используются одинарные кавычки.
//    Придумать шаблон, который заменяет одинарные кавычки на двойные.

let dialog = `
    One: 'Hi Mary.'
    Two: 'Oh, hi.'
    One: 'How are you doing?'
    Two: 'I'm doing alright. How about you?'
    One: 'Not too bad. The weather is great isn't it?'
    Two: 'Yes. It's absolutely beautiful today.'
    One: 'I wish it was like this more frequently.'
    Two: 'Me too.'
    One: 'So where are you going now?'
    Two: 'I'm going to meet a friend of mine at the department store'
    One: 'Going to do a little shopping?'
    Two: 'Yeah, I have to buy some presents for my parents.'
    One: 'What's the occasion?'
    Two: 'It's their anniversary.'
    One: 'That's great. Well, you better get going. You don't want to be late.'
    Two: 'I'll see you next time.'
    One: 'Sure.' Bye.'
`;

// Решение задания 1:
console.log( dialog.replace(/'/g,'"') );



// 2. Улучшить шаблон так, чтобы в конструкциях типа aren't одинарная кавычка не заменялась на двойную.

// Решение задания 2:

// на строке 16, как мне кажется, допущена опечатка - в конце строки перед кавычкой пропущена точка
// Если предположить, что она там есть (store.'), то решение данного задания такое:
console.log( dialog.replace(/\B'/g,'"') );
// данное решение заменяет все кавычки на двойные, кроме aren't  и этой на 16-ой строке

// Если предположить, что это не опечатка, а так задумано, то решение следующее:
console.log( dialog.replace(/\B'|'(?=\n)/g,'"') );
// данное решение охватывает все случаи

// Во втором варианте используется альтернация (или) |
// Информация здесь https://learn.javascript.ru/regexp-alternation