const product = {
    props: ['product'],
    data() {
        return {
            quantity: 1,
            cartAPI: this.$root.$refs.cart,
        };
    },
    template:  `<div class="product__item">
                    <h3>{{ product.title }}</h3>
                    <img :src="product.img" alt="some img">
                    <p>{{ product.price }} &#8381;</p>
                    <input v-model.number="quantity" type="number" min="1" step="1">
                    <button @click="cartAPI.addToCart(product, quantity)" class="buy__btn">Добавить в корзину</button>
                </div>`
};

const products = {
    components: {product},
    data() {
        return {
            filtered: [],
            products: [],
            catalogUrl: "/catalogData.json",
            imgDefault: "https://clck.ru/SurfU",
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
                for (const {id_product:id, product_name:title, price} of products) {
                    this.products.push( {id, title, price, img:this.imgDefault} );
                }
                this.filtered = this.products;
            });
    },
    template:  `<div class="products">
                    <product
                        v-for="product of filtered"
                        :key="product.id"
                        :product="product"
                    ></product>
                </div>`
};

export default products;