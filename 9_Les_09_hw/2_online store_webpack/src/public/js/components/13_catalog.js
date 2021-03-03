const catalogLeftTitle = {
    props: ['title'],
    template:  `<span class="p2_main__left_link">{{ title }}</span>`
};

const catalogLeftGroup = {
    components: {catalogLeftTitle},
    props: ['group', 'titles'],
    template:  `<details class="p2_main__left_details" :open="titles.length > 0">
                    <summary class="p2_main__left_summary">{{ group }}</summary>
                    <catalog-left-title
                        v-if="titles.length == 0"
                        :title="'no content'"
                    ></catalog-left-title>
                    <catalog-left-title
                        v-else
                        v-for="title in titles"
                        :title="title"
                    ></catalog-left-title>
                </details>`
};

const catalogLeft = {
    components: {catalogLeftGroup},
    data() {
        return {
            groups: ["BRAND", "DESIGNER"],
            titles: ["Accessories", "Bags", "Denim", "Hoodies & Sweatshirts", "Jackets & Coats", "Pants", "Polos", "Shirts", "Shoes", "Shorts", "Sweaters & Knits", "T-Shirts", "Tanks"],
        };
    },
    template:  `<nav class="p2_main__left">
                    <catalog-left-group
                        :group="'CATEGORY'"
                        :titles="titles"
                    ></catalog-left-group>
                    <catalog-left-group
                        v-for="group in groups"
                        :group="group"
                        :titles="[]"
                    ></catalog-left-group>
                </nav>`
};


// catalogRightTop

const catalogRightTopRow1 = {
    template:  `<div class="p2_main__topfilter_row1">
                    <div class="p2_main__topfilter_row1-l">
                        <h3 class="p2_main__topfilter_h3">TRENDING NOW</h3>
                        <div class="p2_main__topfilter_content">
                            <p class="p2_main__topfilter_p">
                                <a href="#" class="p2_main__topfilter_link">Bohemian</a>|
                                <a href="#" class="p2_main__topfilter_link">Floral</a>|
                                <a href="#" class="p2_main__topfilter_link">Lace</a>
                            </p>
                            <p class="p2_main__topfilter_p">
                                <a href="#" class="p2_main__topfilter_link">Floral</a>|
                                <a href="#" class="p2_main__topfilter_link">Lace</a>|
                                <a href="#" class="p2_main__topfilter_link">Bohemian</a>
                            </p>
                        </div>
                    </div>
                    <div class="p2_main__topfilter_row1-m">
                        <h3 class="p2_main__topfilter_h3">SIZE</h3>
                        <form action="#" class="p2_main__topfilter_form">
                                <div>
                                    <p><input class="p2_main__topfilter_chb-size" type="checkbox" name="customer_size" value="XXS"><span class="p2_main__topfilter_chb-text">XXS</span></p>
                                    <p><input class="p2_main__topfilter_chb-size" type="checkbox" name="customer_size" value="L"><span class="p2_main__topfilter_chb-text">L</span></p>
                                </div>
                                <div>
                                    <p><input class="p2_main__topfilter_chb-size" type="checkbox" name="customer_size" value="XS"><span class="p2_main__topfilter_chb-text">XS</span></p>
                                    <p><input class="p2_main__topfilter_chb-size" type="checkbox" name="customer_size" value="XL"><span class="p2_main__topfilter_chb-text">XL</span></p>
                                </div>
                                <div>
                                    <p><input class="p2_main__topfilter_chb-size" type="checkbox" name="customer_size" value="S"><span class="p2_main__topfilter_chb-text">S</span></p>
                                    <p><input class="p2_main__topfilter_chb-size" type="checkbox" name="customer_size" value="XXL"><span class="p2_main__topfilter_chb-text">XXL</span></p>
                                </div>
                                <div>
                                    <p><input class="p2_main__topfilter_chb-size" type="checkbox" name="customer_size" value="M"><span class="p2_main__topfilter_chb-text">M</span></p>
                                </div>
                        </form>
                    </div>
                    <div class="p2_main__topfilter_row1-r">
                        <h3 class="p2_main__topfilter_h3">PRICE</h3>
                        <div class="p2_main__topfilter_range">
                            <div class="p2_main__topfilter_range-line"></div>
                            <a href="#"><div class="p2_main__topfilter_range-circle1"></div></a>
                            <a href="#"><div class="p2_main__topfilter_range-circle2"></div></a>
                        </div>
                        <div class="p2_main__topfilter_price">
                            <p class="p2_main__topfilter_price_p">$52</p>
                            <p class="p2_main__topfilter_price_p">$400</p>
                        </div>
                    </div>
                </div>`
};

const catalogRightTopRow2 = {
    template:  `<div class="p2_main__topfilter_row2">
                    <div class="p2_main__topfilter_sort">
                        <h3 class="p2_main__topfilter_row2_h3">Sort By</h3>
                        <form action="#" class="input_arrow-form-1">
                            <input class="p2_main__topfilter_row2-input1" type="text" list="dl_sort-by">
                            <span class="input_arrow-sort-down1"><i class="fas fa-sort-down"></i></span>
                            <datalist id="dl_sort-by">
                                <option value="Name"></option>
                                <option value="Price"></option>
                                <option value="Discount"></option>
                            </datalist>
                        </form>
                    </div>
                    <div class="p2_main__topfilter_show">
                        <h3 class="p2_main__topfilter_row2_h3">Show</h3>
                        <form action="#" class="input_arrow-form-2">
                            <input class="p2_main__topfilter_row2-input2" type="text" list="dl_show"><span class="input_arrow-sort-down2"><i class="fas fa-sort-down"></i></span>
                            <datalist id="dl_show">
                                <option value="01"></option>
                                <option value="02"></option>
                                <option value="03"></option>
                                <option value="04"></option>
                                <option value="05"></option>
                                <option value="06"></option>
                                <option value="07"></option>
                                <option value="08"></option>
                                <option value="09"></option>
                                <option value="10"></option>
                            </datalist>
                        </form>
                    </div>
                </div>`
};

const catalogRightTop = {
    components: {catalogRightTopRow1, catalogRightTopRow2},
    template:  `<div class="p2_main__topfilter">
                    <catalog-right-top-row1></catalog-right-top-row1>
                    <catalog-right-top-row2></catalog-right-top-row2>
                </div>`
};


// catalogRightMiddle

const catalogProduct = {
    props: ['product', 'pageAPI'],
    template:  `<div class="p2_main__product-item">
                    <div @click="pageAPI('single')">
                        <div class="p2_main__product-item-link"><img :src="product.img" alt="product.png"></div>
                        <div class="p2_main__product-item-h3">{{ product.title }}</div>
                        <div class="p2_main__product-item-h4">\${{ product.price }}</div>
                    </div>
                    <div class="p2_main__product-item_add-btn">
                        <img src="../img/8_p2_main/10_p2_cart.png" alt="10_p2_cart.png" class="product__items_hover_img">
                        <span>Add to Cart</span>
                    </div>
                </div>`
};

const catalogRightMiddle = {
    components: {catalogProduct},
    props: ['products', 'pageAPI'],
    template:  `<div class="p2_main__product">
                    <catalog-product
                        v-for="product in products"
                        :product="product"
                        :pageAPI="pageAPI"
                    ></catalog-product>
                </div>`
};

// catalogRightBottom

const catalogRightBottomLink = {
    props: ['title'],
    template:  `<a href="#"><span class="p2_main__pagination-link-active">
                    {{ title }}
                    <slot></slot>
                </span></a>`
};

const catalogRightBottom = {
    components: {catalogRightBottomLink},
    data() {
        return {
            titles: ["1", "2", "3", "4", "5", "6", "...", "20"],
        };
    },
    template:  `<div class="p2_main__pagination">
                    <div class="p2_main__pagination-left">
                        <div class="p2_main__pagination-ul">
                            <catalog-right-bottom-link><i class="fas fa-chevron-left"></i></catalog-right-bottom-link>
                            <catalog-right-bottom-link
                                v-for="title in titles"
                                :title="title"
                            ></catalog-right-bottom-link>
                            <catalog-right-bottom-link><i class="fas fa-chevron-right"></i></catalog-right-bottom-link>
                        </div>
                    </div>
                    <div class="p2_main__pagination-right">
                        <a href="#" class="p2_main__pagination-button">View All</a>
                    </div>
                </div>`
};

const catalogRight = {
    components: {catalogRightTop, catalogRightMiddle, catalogRightBottom},
    props: ['products', 'pageAPI'],
    template:  `<div class="p2_main__right">
                    <catalog-right-top></catalog-right-top>
                    <catalog-right-middle
                        :products="products"
                        :pageAPI="pageAPI"
                    ></catalog-right-middle>
                    <catalog-right-bottom></catalog-right-bottom>
                </div>`
};

const appCatalog = {
    components: {catalogLeft, catalogRight},
    data() {
        return {
            products: [],
            pageAPI: this.$root.changePage,
        };
    },
    created() {
        this.$root.getJson('/api/catalog-new')
            .then(products => {
                for (const product of products) {
                    this.products.push(product);
                }
            });
    },
    template:  `<main class="p2_main center">
                    <catalog-left></catalog-left>
                    <catalog-right
                        :products="products"
                        :pageAPI="pageAPI"
                    ></catalog-right>
                </main>`
};

export default appCatalog;