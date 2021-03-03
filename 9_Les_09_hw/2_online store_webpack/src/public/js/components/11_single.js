const singleSlider = {
    data() {
        return {
            srcEl: "img/11_p4_singlepage",
        };
    },
    template:  `<div class="p4_slider">
                    <div class="p4_slider__left">
                        <a href="#" class="p4_slider__btn"><i class="fas fa-chevron-left"></i></a>
                    </div>
                    <div class="p4_slider__center">
                        <a href="#">
                            <img :src="srcEl+'/0_p4_slider-item.png'" alt="0_p4_slider-item.png">
                        </a>
                    </div>
                    <div class="p4_slider__right">
                        <a href="#" class="p4_slider__btn"><i class="fas fa-chevron-right"></i></a>
                    </div>
                </div>`
};

const singleDescription = {
    data() {
        return {
            srcEl: "img/11_p4_singlepage",
        };
    },
    template:  `<div class="p4_description center">
                    <h4 class="p4_description__h4">WOMEN COLLECTION</h4>
                    <p class="p4_description__p-line"></p>
                    <h3 class="p4_description__h3">Moschino Cheap And Chic</h3>
                    <p class="p4_description__p-text">Compellingly actualize fully researched processes before proactive outsourcing. Progressively syndicate collaborative architectures before cutting-edge services. Completely visualize parallel core competencies rather than exceptional portals.</p>
                    <div class="p4_description__box1">
                        <h4 class="p4_description__box1-h4">MATERIAL:<span class="p4_description__box1-h4-span">COTTON</span></h4>
                        <h4 class="p4_description__box1-h4">DESIGNER:<span class="p4_description__box1-h4-span">BINBURHAN</span></h4>
                    </div>
                    <h3 class="p4_description__h3-price">$561</h3>
                    <div class="p4_description__box2">
                        <h4 class="p4_description__box2-h4">CHOOSE COLOR</h4>
                        <h4 class="p4_description__box2-h4">CHOOSE SIZE</h4>
                        <h4 class="p4_description__box2-h4">QUANTITY</h4>
                    </div>
                    <form action="#" class="p4_description__form">
                        <input class="p4_description__form-input" type="text" list="dl_item-color" placeholder="Choose color"><span class="input_p4-des_list-arrow1"><i class="fas fa-sort-down"></i></span>
                            <datalist id="dl_item-color">
                                    <option value="red"></option>
                                    <option value="green"></option>
                                    <option value="blue"></option>
                            </datalist>
                        <input class="p4_description__form-input" type="text" list="dl_item-size" placeholder="Choose size"><span class="input_p4-des_list-arrow2"><i class="fas fa-sort-down"></i></span>
                            <datalist id="dl_item-size">
                                <option value="XXS"></option>
                                <option value="XS"></option>
                                <option value="S"></option>
                                <option value="M"></option>
                                <option value="L"></option>
                                <option value="XL"></option>
                                <option value="XXL"></option>
                            </datalist>
                        <input class="p4_description__form-input" type="number" min="1" placeholder="Choose quantity">
                    </form>
                    <a href="#" class="p4_description__add-btn">
                        <img :src="srcEl+'/5_p4_slider-cart.png'" alt="5_p4_slider-cart.png" class="p4_description__add-img">
                        <img :src="srcEl+'/6_p4_slider-cart_white.png'" alt="6_p4_slider-cart.png" class="p4_description__add-img-white">Add to Cart</a>
                </div>`
};

const appSingle = {
    components: {singleSlider, singleDescription},
    template:  `<div>
                    <single-slider></single-slider>
                    <single-description></single-description>
                </div>`
};

export default appSingle;