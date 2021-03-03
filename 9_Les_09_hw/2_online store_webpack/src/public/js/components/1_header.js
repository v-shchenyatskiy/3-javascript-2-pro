// BROWSE MENU:

const dropdownTitle = {
    props: ['title', 'pageAPI'],
    template:  `<span @click="pageAPI('single')" class="header__dropdown_link">{{ title }}</span>`
};

const dropdown = {
    components: {dropdownTitle},
    props: ['pageAPI'],
    data() {
        return {
            titles: {
                women: ["Dresses", "Tops", "Sweaters/Knits", "Jackets/Coats", "Blazers", "Denim", "Leggings/Pants", "Skirts/Shorts", "Accessories"],
                men: ["Tees/Tank tops", "Shirts/Polos", "Sweaters", "Sweatshirts/Hoodies", "Blazers", "Jackets/Vests"],
            },
        };
    },
    template:  `<div class="header__browse_menu">
                    Browse
                    <div class="header__dropdown">
                        <div class="header__dropdown_content">
                            <h1 class="header__dropdown_h1">WOMEN</h1>
                            <dropdown-title
                                v-for="title in titles.women"
                                :title="title"
                                :pageAPI="pageAPI"
                            ></dropdown-title>

                            <h1 class="header__dropdown_h1">MEN</h1>
                            <dropdown-title
                                v-for="title in titles.men"
                                :title="title"
                                :pageAPI="pageAPI"
                            ></dropdown-title>
                        </div>
                    </div>
                </div>`
};

const search = {
    data() {
        return {
            value: "",
        };
    },
    template:  `<div class="search">
                    <input
                        v-model="value"
                        v-on:input="$root.$refs.products.filterProducts(value)"
                        type="text"
                        class="header__search"
                        placeholder="Search for Item..."
                    >
                </div>`
};

const browseMenu = {
    components: {dropdown, search},
    data() {
        return {
            pageAPI: this.$root.changePage
        };
    },
    template:  `<div class="header__left">
                    <span @click="pageAPI('index')" class="logo">
                        <img class="logo__img" src="img/1_header/1_logo.png" alt="1_logo.png">BRAN<span class="logo__d">D</span>
                    </span>
                    <dropdown
                        :pageAPI="pageAPI"
                    ></dropdown>
                    <search></search>
                    <button class="header__search_btn"><img src="img/1_header/2_search.png" alt="2_search.png"></button>
                </div>`
};


// CART:

const cartBtn = {
    data() {
        return {
            elClass: "header__cart_img",
            elSrc: "img/1_header/3_cart.png",
            elAlt: "3_cart.png",
        };
    },
    template:  `<img @click="$emit('open')" :class="elClass" :src="elSrc" :alt="elAlt">`
};

const cartItem = {
    props: ['product', 'pageAPI'],
    data() {
        return {
            cartAPI: this.$root.$refs.page.$refs.header.$refs.cart
        };
    },
    template:  `<div class="header__cart_item">
                    <span @click="pageAPI('single')" class="header__cart_item-img">
                        <img :src="product.img" alt="some cart_item.png" style="width: 72px;height: 85px;">
                    </span>
                    <div class="header__cart_content">
                        <h1 class="header__cart_h1">{{ product.name }}</h1>
                        <p class="header__cart_stars">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star-half-alt"></i>
                        </p>
                        <p class="header__cart_p">{{ product.quantity }}<span class="header__cart_px">x</span>\${{ product.price }}</p>
                        <div class="header__cart_quan">
                            <span @click="cartAPI.decreaseQuantity(product.id)">&minus;</span>
                            <span @click="cartAPI.increaseQuantity(product.id)">&plus;</span>
                        </div>
                    </div>
                    <span @click="cartAPI.deleteFromCart(product)" class="header__cart_delete"><i class="fas fa-times-circle"></i></span>
                </div>`
};

const cartItems = {
    props: ['cart', 'pageAPI'],
    components: {cartItem},
    template:  `<div class="cart__items">
                    <div v-if="cart.length == 0" class="header__cart_item_plug">
                        no items in cart yet :(
                    </div>
                    <cart-item
                        v-else
                        v-for="item of cart"
                        :key="item.id"
                        :product="item"
                        :pageAPI="pageAPI"
                    ></cart-item>
                </div>`
};

const cartTotal = {
    props: ['total'],
    template:  `<div class="header__cart_totalsum">
                    <p class="header__cart_totalsum_p">TOTAL</p>
                    <p class="header__cart_totalsum_p">\${{ total }}</p>
                </div>`
};

const cart = {
    components: {cartBtn, cartItems, cartTotal},
    data() {
        return {
            cart: [],
            visible: false,
            pageAPI: this.$root.changePage
        };
    },
    methods: {

        openCart() {
            this.visible = !this.visible;
        },

        addToCart(product, quantity) {
            if (this.isProductInCart(product.id)) { return; }

            product.quantity = quantity;
            product.amount = product.price * product.quantity;
        
            product = Object.assign({}, product);

            this.$root.httpJson('/api/cart', product, 'POST')
                .then(response => {
                    if (response.result === 1) {
                        this.cart.push(product);
                    }
                });
        },

        deleteFromCart(product) {
            this.$root.httpJson('/api/cart', product, 'DELETE')
                .then(response => {
                    if (response.result === 1) {
                        this.cart.splice( this.cart.indexOf(product), 1 );
                    }
                });
        },

        increaseQuantity(id) {
            this.$root.httpJson(`/api/cart/${id}`, {quantity: 1}, 'PUT')
                .then(response => {
                    if (response.result === 1) {
                        let item = this.cart.find(item => item.id === id);
                        item.quantity++;
                        item.amount = item.price * item.quantity;
                    }
                });
        },

        decreaseQuantity(id) {
            this.$root.httpJson(`/api/cart/${id}`, {quantity: -1}, 'PUT')
                .then(response => {
                    if (response.result === 1) {
                        let item = this.cart.find(item => item.id === id);
                        if (item.quantity > 1) {
                            item.quantity--;
                            item.amount = item.price * item.quantity;
                        }
                    }
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
    template:  `<div class="header__right">
                    <div @click="" class="header__cart">
                        <cart-btn v-on:open="openCart"></cart-btn>
                        <div v-show="visible" class="header__cart_dropdown">
                            <cart-items
                                :cart="cart"
                                :pageAPI="pageAPI"
                            ></cart-items>
                            <cart-total :total="cartTotal"></cart-total>
                            <div>
                                <div @click="pageAPI('checkout')" class="header__cart_button">CHECKOUT</div>
                                <div @click="pageAPI('cart')" class="header__cart_button">GO TO CART</div>
                            </div>
                        </div>
                    </div>
                    <a href="#" class="button">My Account</a>
                </div>`,
    created() {
        // this.$root.getJson('/api/cart-clear');
    },
    mounted(){
        this.$root.getJson('/api/cart')
            .then(cart => {
                for( let item of cart.contents ) {
                    this.cart.push(item);
                }
            });
    },
};


// HEADER:

const appHeader = {
    components: {browseMenu, cart},
    template:  `<header class="header center">
                    <browse-menu></browse-menu>
                    <cart ref="cart"></cart>
                </header>`
};

export default appHeader;