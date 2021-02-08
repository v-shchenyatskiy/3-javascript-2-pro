'use strict';

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';

// переделать в ДЗ на промисы. НЕ ИСПОЛЬЗОВАТЬ fetch!!!
let getRequest = (url) => {

    return new Promise( (resolve, reject) => {
        let xhr = new XMLHttpRequest();
    
        xhr.open('GET', url, true);
    
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                xhr.status === 200 ? resolve(xhr.responseText) : reject('Error - Запрос выполнен с ошибками');
            }
        };
    
        xhr.send();
    })
    .then( response => JSON.parse(response) )
    .catch( error => console.log(error) );
}

// ------------------------------------------------

class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this._goods = [];
        this._allProducts = [];

        this._fetchGoods().then(() => {
            this._render();
            this._putBuyBtnHandler();
        });
    }

    _fetchGoods() {
        return getRequest(`${API}catalogData.json`).then( goods => {
            goods.forEach( ( {id_product:id, product_name:title, price} ) => {
                this._goods.push( {id, title, price} );
            });

            // Можно убрать return и оставить эти методы здесь:
            // this._render();
            // this._putBuyBtnHandler();
            // Но мне больше нравится, когда я их вижу в конструкторе
        });
    }

    /*
        _fetchGoods() {
            this._goods = [
                {id: 1, title: "Notebook", price: 20000},
                {id: 2, title: "Mouse", price: 1500},
                {id: 3, title: "Keyboard", price: 5000},
                {id: 4, title: "Gamepad", price: 4500},
            ];
        }
    */

    _render() {
        const block = document.querySelector(this.container);

        for (let product of this._goods) {
            const productObject = new ProductItem(product);
            // console.log(productObject);
        
            this._allProducts.push(productObject);
            block.insertAdjacentHTML('beforeend', productObject.render());
        }
    }

    _putBuyBtnHandler() {
        const btnEls = document.getElementsByClassName("buy__btn");

        for (const element of btnEls) {
            element.addEventListener("click", event => {
                const parent = event.target.parentElement;

                const id = parent.dataset.id;
                const product = this._getProductById(id);
                const img = parent.children[1].src;
            
                cart.addToCart(product, 1, img);
                this._sendAddToCartMsg(parent);
            });
        }
    }

    _getProductById(id) {
        for (const product of this._goods) {
            if ( product.id == id ) { return product; }
        }
    }

    _sendAddToCartMsg(element) {
        const msg = `<span class="msg">Товар добавлен в корзину<span class="clrBtn">&times;</span></span>`;
        element.insertAdjacentHTML("beforeend", msg);

        const deleteParent = (event) => {
            event.target.removeEventListener("click", deleteParent);
            event.target.parentElement.remove();
        };

        element.querySelector(".clrBtn").addEventListener("click", deleteParent);

        setTimeout(() => {
            const clrbtn = element.querySelector(".clrBtn");
            if (clrbtn) {
                clrbtn.removeEventListener("click", deleteParent);
                clrbtn.parentElement.remove();
            }
        }, 2000);
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

        this._cartBtnHandler();
    }

    // Methods:
    addToCart(product, quantity=1, img='') {

        if ( this._isItemInCart(product.id) ) {
            this._updateItem(product.id);
            this._renderTotalAmount();
            return;
        }

        const cartItem = new CartItem(product, quantity, img);
        // console.log(cartItem);

        for (let item of this.items) {
            if ( item.id == cartItem.id ) {
                item.amount += cartItem.amount;
                item.quantity += cartItem.quantity;
                return;
            }
        }

        this.items.push(cartItem);
    
        this._renderItem(cartItem.id);
        this._renderTotalAmount();
    }

    changeQuantity(id, newQuantity) {
        for (let item of this.items) {
            if ( item.id == id ) {
                item.quantity = newQuantity;
                item.amount = item.price * item.quantity;
            }
        }
        this._renderQuantity(id);
    }

    removeFromCart(id) {
        for (let i in this.items) {
            if ( this.items[i].id == id ) { this.items.splice(i,1); }
        }
    }

    countGoods() {
        return this.items.length;
    }

    countQuantity() {
        return this.items.reduce( (sum, { quantity }) => sum + quantity, 0 );
    }

    countTotalAmount() {
        return this.items.reduce( (sum, { amount }) => sum + amount, 0 );
    }

    _renderItem(itemId) {
        const { id, title, price, img, quantity } = this._getItem(itemId);
        const cartItem = new CartItem({id, title, price}, quantity, img);

        const cart = document.querySelector(".cart__items");
        cart.insertAdjacentHTML("beforeend", cartItem._createEl());

        this._putInpHandler(id);
        this._putClrBtnHandler(id);
    }

    _updateItem(id) {
        let {quantity} = this._getItem(id);
        quantity++;
        this.changeQuantity(id, quantity);
    }

    _renderQuantity(id) {
        const { quantity } = this._getItem(id);
    
        const item = this._getDomItemEl(id);
        item.children[4].value = quantity;
        this._renderAmount(id);
    }

    _renderAmount(id) {
        const {amount} = this._getItem(id);
        const item = this._getDomItemEl(id);
        item.children[5].innerHTML= `${amount} &#8381;`;
    }

    _renderTotalAmount() {
        const tAmount = this.countTotalAmount();
        document.getElementById("cart_total").innerHTML = `${tAmount} &#8381;`;
    }

    _isItemInCart(id) {
        for (const item of this.items) {
            if ( item.id == id ) { return true; }
        }
        return false;
    }

    _getItem(id) {
        for (const item of this.items) {
            if ( item.id == id ) { return item; }
        }
    }

    _getDomItemEl(id) {
        const items = document.getElementsByClassName("cart__item");
    
        for (const item of items) {
            if ( item.dataset.id == id ) { return item; }
        }
    }

    _putInpHandler(id) {
        const changeEvent = (event) => {

            const id = event.target.parentElement.dataset.id;
            const quantity = Number(event.target.parentElement.children[4].value);

            this.changeQuantity(id, quantity);
            this._renderTotalAmount();
        };

        const item = this._getDomItemEl(id);
        item.children[4].addEventListener("change", changeEvent);
    }

    _putClrBtnHandler(id) {
        const deleteParent = (event) => {
            event.target.removeEventListener("click", deleteParent); // clearEl

            const id = event.target.parentElement.dataset.id;
            this.removeFromCart(id);

            event.target.parentElement.remove(); // parentEl
            this._renderTotalAmount();
        };

        const item = this._getDomItemEl(id);
        item.lastElementChild.addEventListener("click", deleteParent);
    }

    _cartBtnHandler() {
        const btn = document.querySelector(".cart_btn");
        btn.addEventListener("click", (event) => {
            let status = event.target.parentElement.lastElementChild.style;
            status.display = (status.display == "none") ? "flex" : "none";
        });
    }
}

class CartItem extends ProductItem {
    constructor(product, quantity=1, img='') {
        super(product, img);
        this.quantity = quantity;
        this.amount = this.price * this.quantity;
    }

    // Methods:
    _createEl() {
        return `
            <div class="cart__item" data-id="${this.id}">
                <span style="min-width: 10%;">${this.id}</span>
                <span><a href="#"><img src="${this.img}" alt="some img" style="width: 30px;"></a></span>
                <span>${this.title}</span>
                <span>${this.price} &#8381;</span>
                <input type="number" value="${this.quantity}" min="1" step="1">
                <span>${this.amount} &#8381;</span>
                <span class="cart__item_x" style="min-width: 5%;">&times;</span>
            </div>
        `;
    }
}


const productList = new ProductList();
const cart = new Cart();