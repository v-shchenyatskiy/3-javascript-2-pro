'use strict';

class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this._goods = [];
        this._allProducts = [];

        this._fetchGoods();
        this._render();
    }

    _fetchGoods() {
        this._goods = [
            {id: 1, title: "Notebook", price: 20000},
            {id: 2, title: "Mouse", price: 1500},
            {id: 3, title: "Keyboard", price: 5000},
            {id: 4, title: "Gamepad", price: 4500},
        ];
    }

    _render() {
        const block = document.querySelector(this.container);

        for (let product of this._goods) {
            const productObject = new ProductItem(product);
            // console.log(productObject);
        
            this._allProducts.push(productObject);
            block.insertAdjacentHTML('beforeend', productObject.render());
        }
    }
}

class ProductItem {
    constructor(product, img="https://clck.ru/SurfU") {
        this.id = product.id;
        this.title = product.title;
        this.price = product.price;
        this.img = img;
    }

    render() {
        return `
            <div class="product__item" data-id="${this.id}">
                <h3>${this.title}</h3>
                <img src="${this.img}" alt="some img">
                <p>${this.price} &#8381;</p>
                <button class="buy__btn">Добавить в корзину</button>
            </div>
        `;
    }
}

class Cart {
    constructor( items = [] ) {
        this.items = items;
        this.countGoods = 0;
        this.amount = 0;

        if ( this.items[0] ) { this._updateSums(); }
        this._cartBtnHandler();
    }

    // Methods:
    addToCart(product, quantity=undefined, img=undefined) {
        const cartItem = new CartItem(product, quantity, img);

        for (let item of this.items) {
            if ( item.id == cartItem.id ) {
                item.amount += cartItem.amount;
                item.quantity += cartItem.quantity;
                this._updateSums();
                return;
            }
        }

        this.items.push(cartItem);
        this._updateSums();
    }

    changeQuantity(product, newQuantity, id=undefined) {
        if (!id) {
            const cartItem = new CartItem(product);
            id = cartItem.id;
        }
    
        for (let item of this.items) {
            if ( item.id == id ) {
                item.quantity = newQuantity;
                item.amount = item.price * item.quantity;
            }
        }
    
        this._updateSums();
    }

    removeFromCart(product, id=undefined) {
        if (!id) {
            const cartItem = new CartItem(product);
            id = cartItem.id;
        }

        let arr = [];
    
        for (let item of this.items) {
            if ( item.id != id ) {
                arr.push(item);
            }
        }

        this.items = arr;
        this._updateSums();
    }

    _updateSums() {
        this.amount = this._countAmount();
        this.countGoods = this._countGoods();
    }

    _countAmount() {
        let amount = 0;
    
        for (const item of this.items) {
            amount += item.amount;
        }

        return amount;
    }

    _countGoods() {
        let count = 0;
    
        for (const item of this.items) {
            count++;
        }

        return count;
    }

    _selector() {
        return ".btn_cart";
    }

    _render() {
        // корзина должна по своему отрисовываться в выпадающем списке и/или в отдельном окне при переходе
        // смотря какая будет логика
    }

    _cartBtnHandler() {
        const btn = document.querySelector( this._selector() );
        btn.addEventListener("click", (event) => {
            console.log(event);
            console.log("show cart")
        });
    }

    async _postJSON() {
        // Здесь должна быть отправка готовой корзины на оплату (в БД на сервер, в платежную систему итд)
    
        // Ниже просто тест запроса готовой корзины через GET
        const json = this._getJSON();

        const url = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json";
        const options = {};

        let response = await fetch(url, options);
        let result = await response.json();
        console.log(result);

    }

    _getJSON() {
        return JSON.stringify(this.items);
    }
}

class CartItem extends ProductItem {
    constructor(product, quantity=1, img) {
        super(product, img);
        this.quantity = quantity;
        this.amount = this.price * this.quantity;
    }

    // Methods:
    _render() {
        // эта функция готовит element и возвращает его в Cart Obj для отрисовки в DOM
    }
}


const productList = new ProductList();
const cart = new Cart();