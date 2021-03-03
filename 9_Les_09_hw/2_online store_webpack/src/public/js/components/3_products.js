// PRODUCTS:

const product = {
    props: ['product'],
    data() {
        return {
            quantity: 1,
            cartAPI: this.$root.$refs.page.$refs.header.$refs.cart,
            pageAPI: this.$root.changePage,
        };
    },
    template:  `<div class="product__items_item">
                    <div @click="pageAPI('single')">
                        <img @click="pageAPI('single')" class="product__items_bg-img" :src="product.img" alt="some product.png">
                        <div class="product__items_text">
                            <h4 class="product__items_text_h4">{{ product.title }}</h4>
                            <p class="product__items_text_p">\${{ product.price }}</p>
                        </div>
                    </div>
                    <div @click="cartAPI.addToCart(product, quantity)" class="product__items_hover">
                        <img src="img/4_index_product/9_cart.png" alt="9_cart.png" class="product__items_hover_img">
                        <span>Add to Cart</span>
                    </div>
                </div>`
};

const appProducts = {
    components: {product},
    data() {
        return {
            filtered: [],
            products: [],
            pageAPI: this.$root.changePage,
        };
    },
    methods: {
        filterProducts(value) {
            if (!value) { this.filtered = this.products; return; }

            value = value.toLowerCase();

            this.filtered = this.products.filter(item => {
                if ( item.title.toLowerCase().includes(value) ) { return item; };
            });
        },
    },
    created() {
        this.$root.getJson('/api/catalog')
            .then(products => {
                for (const product of products) {
                    this.products.push(product);
                }
                this.filtered = this.products;
            });
    },
    template:  `<section class="product center">
                    <section class="product center">
                        <h2 class="product__featured_h2">Featured Items</h2>
                        <p class="product__featured_p">Shop for items based on what we featured in this week</p>
                        <article class="product__items">
                            <product
                                v-for="product of filtered"
                                :key="product.id"
                                :product="product"
                            ></product>
                        </article>
                        <div @click="pageAPI('catalog')" class="product_button">
                            <span class="button">Browse All Product</span>
                        </div>
                    </section>
                </section>`
};

export default appProducts;