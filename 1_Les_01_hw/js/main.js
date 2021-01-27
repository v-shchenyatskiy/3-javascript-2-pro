'use strict';

// Второй вариант решения

const products = [
    { id: 1, title: 'Notebook', price: 20000, img: "https://clck.ru/SurfU" },
    { id: 2, title: 'Mouse', price: 1500 },
    { id: 3, title: 'Keyboard', price: 5000 },
    { id: 4, title: 'Gamepad', price: 4500 },
];

const renderProducts = ( list ) => {
    let fragment = document.createDocumentFragment();

    list.forEach( product => {
        let htmlStr = getProductEl( product.title, product.price, product.img );
        let node = makeNode(htmlStr);
        fragment.appendChild(node);
    });

    document.querySelector('.products').appendChild(fragment);
};

const getProductEl = ( title, price, img = '' ) => {
    return `
        <div class="product__item">
            <h3>${title}</h3>
            ${ (img != '') ? `<img src="${img}" alt="img">` : '<span class="img_blank"></span>' }
            <p>${price} &#8381;</p>
            <button class="buy__btn">Добавить в корзину</button>
        </div>`;
};

const makeNode = ( htmlStr ) => {
    let div = document.createElement("div");
    div.innerHTML = htmlStr;
    return div.children[0];
};


renderProducts(products);