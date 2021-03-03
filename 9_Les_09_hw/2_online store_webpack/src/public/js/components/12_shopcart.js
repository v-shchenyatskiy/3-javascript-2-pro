const shopcartItem = {
    props: ['item'],
    template:  `<div class="p3_shopping-cart__item">
                    <div class="p3_shopping-cart__item_left">
                        <a href="2_singlepage.html" class="p3_shopping-cart__item_link">
                            <img :src="item.img" alt="1_shoppingcart.png">
                        </a>
                        <div>
                            <h4 class="p3_shopping-cart__item_h4">{{ item.title }}</h4>
                            <p class="p3_shopping-cart__item_p">Color: <span class="p3_shopping-cart__item_p-span">Red</span></p>
                            <p class="p3_shopping-cart__item_p">Size: <span class="p3_shopping-cart__item_p-span">Xll</span></p>
                        </div>
                    </div>
                    <div class="p3_shopping-cart__item_right">
                        <p class="p3_shopping-cart_item_right_p">\${{ item.price }}</p>
                        <p class="p3_shopping-cart_item_right_p">{{ item.quantity }}</p>
                        <p class="p3_shopping-cart_item_right_p">FREE</p>
                        <p class="p3_shopping-cart_item_right_p">\${{ item.amount }}</p>
                        <p class="p3_shopping-cart_item_right_p_closebtn"><i class="fas fa-times-circle" aria-hidden="true"></i></p>
                    </div>
                </div>`
};

const shopcartContentTopTitle = {
    props: ['title'],
    template:  `<h4 class="p3_shopping-cart__header_h4">{{ title }}</h4>`
};

const shopcartContentTop = {
    components: {shopcartContentTopTitle},
    data() {
        return {
            titles: ["unite Price", "Quantity", "shipping", "Subtotal", "ACTION"],
        };
    },
    template:  `<div class="p3_shopping-cart__header">
                    <h4 class="p3_shopping-cart__header_h4-left">Product Details</h4>
                    <div class="p3_shopping-cart__header_box">
                        <shopcart-content-top-title
                            v-for="title in titles"
                            :title="title"
                        ></shopcart-content-top-title>
                    </div>
                </div>`
};

const shopcartContentBottomLink = {
    props: ['title'],
    template:  `<a class="p3_shopping-cart__footer_link" href="#">
                    <h4 class="p3_shopping-cart__footer_h4">{{ title }}</h4>
                </a>`
};

const shopcartContentBottom = {
    components: {shopcartContentBottomLink},
    data() {
        return {
            titles: ["cLEAR SHOPPING CART", "cONTINUE sHOPPING"],
        };
    },
    template:  `<div class="p3_shopping-cart__footer">
                    <shopcart-content-bottom-link
                        v-for="title in titles"
                        :title="title"
                    ></shopcart-content-bottom-link>
                </div>`
};

const shopcartContent = {
    components: {shopcartContentTop, shopcartItem, shopcartContentBottom},
    props: ['cart'],
    template:  `<div class="p3_shopping-cart center">
                    <shopcart-content-top></shopcart-content-top>
                    <div
                        v-if="cart.length == 0"
                        class="p3_shopping-cart__item"
                        style="display: flex; justify-content: center;color: red; font-size: 20px; background-color: beige;"
                    ><span>no items in cart yet :(</span></div>
                    <shopcart-item
                        v-else
                        v-for="item of cart"
                        :item="item"
                        :key="item.id"
                    ></shopcart-item>
                    <shopcart-content-bottom></shopcart-content-bottom>
                </div>`
};

const shopcartShippingBlockA = {
    template:  `<div class="p3_shipping__address">
                    <h3 class="p3_shipping__address_h3">Shipping Address</h3>
                    <form action="#" class="input_arrow-shippingform">
                        <input class="p3_shipping_address-input1" type="text" list="dl_shippcountry" placeholder="Choose your country..."><span class="input_shipping_list-arrow"><i class="fas fa-sort-down"></i></span>
                        <datalist id="dl_shippcountry">
                            <option value="Bangladesh"></option>
                            <option value="Bangladesh"></option>
                            <option value="Bangladesh"></option>
                        </datalist>
                        <input class="p3_shipping_address-input2" type="text" placeholder="State">
                        <input class="p3_shipping_address-input3" type="text" placeholder="Postcode / Zip" pattern="[0-9]{5,6}">
                    </form>
                    <a href="#" class="p3_shipping__address_btn">get a quote</a>
                </div>`
};

const shopcartShippingBlockB = {
    template:  `<div class="p3_shipping__coupon">
                    <h3 class="p3_shipping__coupon_h3">coupon discount</h3>
                    <p class="p3_shipping__coupon_p">Enter your coupon code if you have one</p>
                    <form action="#" class="p3_shipping__coupon-form">
                        <input class="p3_shipping_coupon-input" type="text" placeholder="State">
                    </form>
                    <a href="#" class="p3_shipping__coupon_btn">Apply coupon</a>
                </div>`
};

const shopcartShippingBlockC = {
    props:['total', 'pageAPI'],
    template:  `<div class="p3_shipping__total">
                    <p class="p3_shipping__total_p">Sub total<span class="p3_shipping__total_p-span">\${{ total }}</span></p>
                    <h3 class="p3_shipping__total_h3">GRAND TOTAL<span class="p3_shipping__total_h3-span">\${{ total }}</span></h3>
                    <span @click="pageAPI('checkout')" class="p3_shipping__total_btn">proceed to checkout</span>
                </div>`
};

const shopcartShipping = {
    components: {shopcartShippingBlockA, shopcartShippingBlockB, shopcartShippingBlockC},
    props:['total', 'pageAPI'],
    template:  `<div class="p3_shipping center">
                    <shopcart-shipping-block-a></shopcart-shipping-block-a>
                    <shopcart-shipping-block-b></shopcart-shipping-block-b>
                    <shopcart-shipping-block-c
                        :total="total"
                        :pageAPI="pageAPI"
                    ></shopcart-shipping-block-c>
                </div>`
};

const appShopcart = {
    components: {shopcartContent, shopcartShipping},
    data() {
        return {
            cart: [],
            pageAPI: this.$root.changePage
        };
    },
    methods: {
        linkCart() {
            return this.cart = this.$root.$refs.page.$refs.header.$refs.cart.cart;
        },
    },
    computed: {
        cartTotal() {
            return this.cart.reduce( (sum, { amount }) => sum + amount, 0 );
        },
    },
    mounted() {
        this.linkCart();
    },
    template:  `<div>
                    <shopcart-content
                        :cart="cart"
                    ></shopcart-content>
                    <shopcart-shipping
                        :total="cartTotal"
                        :pageAPI="pageAPI"
                    ></shopcart-shipping>
                </div>`
};

export default appShopcart;