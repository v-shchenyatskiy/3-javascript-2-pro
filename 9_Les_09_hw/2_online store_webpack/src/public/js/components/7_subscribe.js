const subscribeLeft = {
    data() {
        return {
            p: "\“Vestibulum quis porttitor dui! Quisque viverra nunc mi, a pulvinar purus condimentum a. Aliquam condimentum mattis neque sed pretium\”",
            h5: "Bin Burhan",
            h6: "Dhaka, Bd",
            srcEl: "img/6_index_subscribe/2_face.png"
        };
    },
    template:  `<div class="subscribe__left">
                    <img class="subscribe__left_img" :src="srcEl" alt="face.png">
                    <div class="subscribe__left_content">
                        <p class="subscribe__left_content_p">{{ p }}</p>
                        <h5 class="subscribe__left_content_h5">{{ h5 }}</h5>
                        <h6 class="subscribe__left_content_h6">{{ h6 }}</h6>
                        <div class="subscribe__left_slider">
                            <a href="#" class="slider_button"></a>
                            <a href="#" class="slider_button_active"></a>
                            <a href="#" class="slider_button"></a>
                        </div>
                    </div>
                </div>`
};

const subscribeRight = {
    data() {
        return {
            h3: "Subscribe",
            h4: "FOR OUR NEWLETTER AND PROMOTION",
        };
    },
    template:  `<div class="subscribe__right">
                    <h3 class="subscribe__right_h3">{{ h3 }}</h3>
                    <h4 class="subscribe__right_h4">{{ h4 }}</h4>
                    <form action="#" class="subscribe__form">
                        <input class="subscribe__input_text" type="email" placeholder="Enter Your Email">
                        <span class="subscribe_button">Subscribe</span>
                    </form>
                </div>`
};

const appSubscribe = {
    components: {subscribeLeft, subscribeRight},
    template:  `<section class="subscribe center">
                    <subscribe-left></subscribe-left>
                    <subscribe-right></subscribe-right>
                    <div class="subscribe_opacity">
                        <img src="img/6_index_subscribe/1_subscribe_bg.png" alt="1_subscribe_bg.png">
                    </div>
                </section>`
};

export default appSubscribe;