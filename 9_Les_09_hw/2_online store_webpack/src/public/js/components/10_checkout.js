const checkoutContentLeft = {
    template:  `<div class="p5_shipping__left">
                    <h5 class="p5_shipping__h5">Check as a guest or register</h5>
                    <p class="p5_shipping__p">Register with us for future convenience</p>
                    <form action="#" class="p5_shipping__form1">
                        <p><input type="radio" class="p5_shipping__input-radio1"><span class="p5_shipping__input-span">checkout as guest</span></p>
                        <p><input type="radio" class="p5_shipping__input-radio2"><span class="p5_shipping__input-span">register</span></p>
                    </form>
                    <h5 class="p5_shipping__h5">register and save time!</h5>
                    <p class="p5_shipping__p">Register with us for future convenience</p>
                    <a href="#" class="p5_shipping__link"><i class="fas fa-angle-double-right"></i>Fast and easy checkout</a>
                    <a href="#" class="p5_shipping__link"><i class="fas fa-angle-double-right"></i>Easy access to your order history and status</a>
                    <a href="#" class="p5_shipping__btn">Continue</a>
                </div>`
};

const checkoutContentRight = {
    template:  `<div class="p5_shipping__right">
                    <h5 class="p5_shipping__h5">Already registed?</h5>
                    <p class="p5_shipping__p">Please log in below</p>
                    <form action="#" class="p5_shipping__form2">
                        <label class="p5_shipping__login"><span class="p5_shipping__login-text">EMAIL ADDRESS <span class="p5_shipping__login-star">*</span></span>
                            <input type="email"  class="p5_shipping__login-area1">
                        </label>
                        <label class="p5_shipping__login"><span class="p5_shipping__login-text">PASSWORD <span class="p5_shipping__login-star">*</span></span>
                            <input type="password"  class="p5_shipping__login-area2">
                        </label>
                    </form>
                    <p class="p5_shipping__p-red">* Required Fileds</p>
                    <div class="p5_shipping__right-box">
                        <a href="#" class="p5_shipping__btn">Log in</a>
                        <a href="#" class="p5_shipping__link-forgot">Forgot Password ?</a>
                    </div>
                </div>`
};

const checkoutContent = {
    components: {checkoutContentLeft, checkoutContentRight},
    template:  `<div class="p5_shipping center">
                    <checkout-content-left></checkout-content-left>
                    <checkout-content-right></checkout-content-right>
                </div>`
};

const checkoutTitle = {
    components: {checkoutContent},
    props: ['title', 'idx'],
    data() {
        return {
            visible: true,
        };
    },
    computed: {
        content() {
            if (this.idx == 0) { return true; } else { return false; }
        },
    },
    template:  `<div>
                    <h4 @click="visible = !visible" class="p5_shipping__h4">{{ title }}</h4>
                    <checkout-content v-if="content" v-show="visible"></checkout-content>
                    <div v-else v-show="!visible">No content</div>
                </div>`
};

const appCheckout = {
    components: {checkoutTitle},
    data() {
        return {
            titles: ["01. SHIPPING ADDRESS", "02. BILLING INFORMATION", "03. SHIPPING INFORMATION", "04. SHIPPING METHOD", "05. PAYMENT METHOD", "06. ORDER REVIEW"],
        };
    },
    template:  `<div class="center">
                    <checkout-title
                        v-for="(title, idx) in titles"
                        :title="title"
                        :idx="idx"
                    ></checkout-title>
                </div>`
};

export default appCheckout;