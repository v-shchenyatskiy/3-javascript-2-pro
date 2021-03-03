'use strict';

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';


Vue.component('cart__top', {
    template: `
            <div class="cart__top">
                <span style="min-width: 10%;">id</span>
                <span>img</span>
                <span>Product</span>
                <span>Price</span>
                <span>Quan</span>
                <span>Amount</span>
                <span style="min-width: 5%;"></span>
            </div>
    `
});

Vue.component('cart__bottom', {
    props: ['total'],
    template: `
            <div class="cart__bottom">
                <span>Total:</span>
                <span id="cart_total">{{ total }} &#8381;</span>
            </div>
    `
});


const app = new Vue({
    el: "#app",
    data: {
        filter: [],
        products: [],
        cart: [],
        showCart: false,
        imgDefault: "https://clck.ru/SurfU",
    },
    methods: {
        getRequest(url) {
            return fetch(url)
            .then( response => response.json() )
            .catch( error => console.log(error) );
        },

        filterProducts(event) {
            if (!event.target.value) { this.filter = this.products; return; }

            let value = event.target.value.toLowerCase();

            this.filter = this.products.filter(item => {
                if ( item.title.toLowerCase().includes(value) ) { return item; };
            });
        },

        addtoCart(event) {
            const id = event.target.parentElement.dataset.id;

            if (this.isProductInCart(id)) { return; }

            let product = this.getProductById(id);
            product.quantity = Number(event.target.parentElement.children[3].value);
            product.amount = product.price * product.quantity;

            this.cart.push(product);
        },

        deleteFromCart(event) {
            const id = event.target.parentElement.dataset.id;

            this.cart.filter((item, idx) => {
                if (item.id == id) { this.cart.splice(idx,1); return; }
            });
        },

        increaseQuantity(event) {
            const id = event.target.parentElement.parentElement.dataset.id;

            this.cart = this.cart.map(item => {
                if (item.id == id) {
                    item.quantity++;
                    item.amount = item.price * item.quantity;
                }
                return item;
            });
        },

        decreaseQuantity(event) {
            const id = event.target.parentElement.parentElement.dataset.id;
        
            this.cart = this.cart.map(item => {
                if (item.id == id) {
                    if (item.quantity > 1) {
                        item.quantity--;
                        item.amount = item.price * item.quantity;
                    }
                }
                return item;
            });
        },

        isProductInCart(id) {
            let [ product ] = this.cart.filter(item => item.id == id);
            if ( product ) { return true; } else { return false; }
        },

        getProductById(id) {
            let [ product ] = this.products.filter(item => item.id == id);
            return product;
        },
    },
    computed: {
        cartTotal() {
            return this.cart.reduce( (sum, { amount }) => sum + amount, 0 );
        },
    },
    beforeCreate() {},
    created() {
        this.getRequest(`${API}/catalogData.json`)
            .then( products => {
                for (const {id_product:id, product_name:title, price} of products) {
                    this.products.push( {id, title, price, img:this.imgDefault} );
                }
                this.filter = this.products;
            });
    },
    beforeMount() {},
    mounted() {},
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {},
    destroyed() {},
});
