// MENU:

const menuProduct = {
    props: ['title', 'pageAPI'],
    template:  `<span @click="pageAPI('single')" class="menu__megamenu_link">{{ title }}</span>`
};

const megamenu = {
    components: {menuProduct},
    props: ['title', 'products', 'pageAPI'],
    template:  `<div class="menu__megamenu_content">
                    <h3 class="menu__megamenu_h3">{{ title }}</h3>
                    <div class="menu__megamenu_ul">
                        <menu-product
                            v-for="product in products"
                            :title="product"
                            :pageAPI="pageAPI"
                        ></menu-product>
                    </div>
                </div>`
};

const menuSection = {
    components: {megamenu},
    props: ['title', 'idx', 'pageAPI'],
    data() {
        return {
            url: "../pages/0_product.html",
            img: "../img/1_header/4_megamenu_sale.png",
            titles: ["Men", "Women", "Kids", "Accessories", "Featured", "Hot", "Deals"],
            products: {
                blockA: ["Dresses", "Tops", "Sweaters/Knits", "Jackets/Coats", "Blazers", "Denim", "Leggings/Pants", "Skirts/Shorts", "Accessories"],
                blockB: ["Dresses", "Tops", "Sweaters/Knits", "Jackets/Coats"],
                blockC: ["Dresses", "Tops", "Sweaters/Knits"],
                blockD: ["Dresses", "Tops", "Sweaters/Knits", "Jackets/Coats"],
            },
        };
    },
    computed: {
        rightMenu() {
            if (this.idx >= 3) { return true; } else { return false; }
        },
    },
    template:  `<div class="menu__section">
                    <span @click="pageAPI('single')" class="menu__link">{{ title }}</span>
                    <div class="menu__megamenu" :class="{megamenu_right: rightMenu}">
                        <megamenu
                            :title="title"
                            :products="products.blockA"
                            :pageAPI="pageAPI"
                        ></megamenu>
                        <div>
                            <megamenu
                                :title="title"
                                :products="products.blockB"
                                :pageAPI="pageAPI"
                            ></megamenu>
                            <megamenu
                                :title="title"
                                :products="products.blockC"
                                :pageAPI="pageAPI"
                            ></megamenu>
                        </div>
                        <div>
                            <megamenu
                                :title="title"
                                :products="products.blockD"
                                :pageAPI="pageAPI"
                            ></megamenu>
                            <div @click="pageAPI('single')">
                                <img class="menu__megamenu_img" :src="img" alt="4_megamenu_sale.png">
                                <span class="menu__megamenu_supersale">Super sale!</span>
                            </div>
                        </div>
                    </div>
                </div>`
};

const appMenu = {
    components: {menuSection},
    data() {
        return {
            titles: ["Men", "Women", "Kids", "Accessories", "Featured", "Hot", "Deals"],
            pageAPI: this.$root.changePage
        };
    },
    methods: {

        // openCart() {
        //     this.visible = !this.visible;
        // },

        // addToCart(product, quantity) {
        //     if (this.isProductInCart(product.id)) { return; }

        //     product.quantity = quantity;
        //     product.amount = product.price * product.quantity;
        
        //     product = Object.assign({}, product);

        //     this.$root.httpJson('/api/cart', product, 'POST')
        //         .then(response => {
        //             if (response.result === 1) {
        //                 this.cart.push(product);
        //             }
        //         });
        // },

        // deleteFromCart(product) {
        //     this.$root.httpJson('/api/cart', product, 'DELETE')
        //         .then(response => {
        //             if (response.result === 1) {
        //                 this.cart.splice( this.cart.indexOf(product), 1 );
        //             }
        //         });
        // },

        // increaseQuantity(id) {
        //     this.$root.httpJson(`/api/cart/${id}`, {quantity: 1}, 'PUT')
        //         .then(response => {
        //             if (response.result === 1) {
        //                 let item = this.cart.find(item => item.id === id);
        //                 item.quantity++;
        //                 item.amount = item.price * item.quantity;
        //             }
        //         });
        // },

        // decreaseQuantity(id) {
        //     this.$root.httpJson(`/api/cart/${id}`, {quantity: -1}, 'PUT')
        //         .then(response => {
        //             if (response.result === 1) {
        //                 let item = this.cart.find(item => item.id === id);
        //                 if (item.quantity > 1) {
        //                     item.quantity--;
        //                     item.amount = item.price * item.quantity;
        //                 }
        //             }
        //         });
        // },

        // isProductInCart(id) {
        //     let item = this.cart.find(item => item.id === id);
        //     if ( item ) { return true; } else { return false; }
        // },

    },
    computed: {
        cartTotal() {
            return this.cart.reduce( (sum, { amount }) => sum + amount, 0 );
        },
    },
    template:  `<nav class="menu center">
                    <span @click="pageAPI('index')" class="menu__section menu__section_active" style="cursor: pointer;">Home</span>
                    <menu-section
                        v-for="(title, idx) in titles"
                        :title="title"
                        :idx="idx"
                        :pageAPI="pageAPI"
                    ></menu-section>
                </nav>`,
};

export default appMenu;