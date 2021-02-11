'use strict';

const cartTop = {
    name: 'cart-top',
    template:  `<div class="cart__top">
                    <span style="min-width: 10%;">id</span>
                    <span>img</span>
                    <span>Product</span>
                    <span>Price</span>
                    <span>Quan</span>
                    <span>Amount</span>
                    <span style="min-width: 5%;"></span>
                </div>`
};

const cartBottom = {
    name: 'cart-bottom',
    props: ['total'],
    template:  `<div class="cart__bottom">
                    <span>Total:</span>
                    <span id="cart_total">{{ total }} &#8381;</span>
                </div>`
};

Vue.component('cart', {
    components: {cartTop, cartBottom},
    data() {
        return {
            cart: [],
            showCart: false,
        };
    },
    methods: {

        addToCart(product, quantity) {
            if (this.isProductInCart(product.id)) { return; }

            product.quantity = quantity;
            product.amount = product.price * product.quantity;
        
            product = Object.assign({}, product);

            this.cart.push(product);
        },

        deleteFromCart(product) {
            this.cart.splice( this.cart.indexOf(product), 1 );
        },

        increaseQuantity(id) {
            this.cart = this.cart.map(item => {
                if (item.id === id) {
                    item.quantity++;
                    item.amount = item.price * item.quantity;
                }
                return item;
            });
        },

        decreaseQuantity(id) {
            this.cart = this.cart.map(item => {
                if (item.id === id) {
                    if (item.quantity > 1) {
                        item.quantity--;
                        item.amount = item.price * item.quantity;
                    }
                }
                return item;
            });
        },

        isProductInCart(id) {
            let item = this.cart.find(item => item.id === id);
            if ( item ) { return true; } else { return false; }
        },

    },
    computed: {
        cartTotal() {
            return this.cart.reduce( (sum, { amount }) => sum + amount, 0 );
        },
    },
    template:  `<div class="cart_box">
                    <button @click="showCart=!showCart" class="cart_btn" type="button">Корзина</button>
                    <div class="cart" :class="{cart_hidden: !showCart}">
                        <cart-top></cart-top>
                        <cart-items :cart="cart"></cart-items>
                        <cart-bottom :total="cartTotal"></cart-bottom>
                    </div>
                </div>`
});


const cartItem = {
    name: 'cart-item',
    props: ['product'],
    data() {
        return {
            cartAPI: this.$root.$refs.cart,
        };
    },
    template:  `<div class="cart__item">
                    <span style="min-width: 10%;">{{ product.id }}</span>
                    <span><a href="#"><img :src="product.img" alt="some img" style="width: 30px;"></a></span>
                    <span>{{ product.title }}</span>
                    <span>{{ product.price }} &#8381;</span>
                    <div class="cart__item_quantity">
                        <span @click="cartAPI.decreaseQuantity(product.id)">&minus;</span>
                        <p>{{ product.quantity }}</p>
                        <span @click="cartAPI.increaseQuantity(product.id)">&plus;</span>
                    </div>
                    <span>{{ product.amount }} &#8381;</span>
                    <span @click="cartAPI.deleteFromCart(product)" class="cart__item_x" style="min-width: 5%;">&times;</span>
                </div>`
};

Vue.component('cart-items', {
    props: ['cart'],
    components: {cartItem},
    template:  `<div class="cart__items">
                    <div v-if="cart.length == 0" class="cart__item cart__item_plug">
                        <span>Список товаров пуст. Добавьте товар в корзину.</span>
                    </div>
                    <cart-item
                        v-else
                        v-for="item of cart"
                        :key="item.id"
                        :product="item"
                    ></cart-item>
                </div>`
});