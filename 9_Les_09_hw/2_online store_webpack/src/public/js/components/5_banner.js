const bannerLink = {
    props: ['h4','h3'],
    template:  `<a class="banner__link" href="#">
                    <div class="banner_text">
                        <h4 class="banner_text_h4">{{ h4 }}</h4>
                        <h3 class="banner_text_h3">{{ h3 }}</h3>
                    </div>
                </a>`
};

const bannerLeft = {
    components: {bannerLink},
    props: ['pageAPI'],
    template:  `<div class="banner__left">
                    <div @click="pageAPI('single')" class="banner__left_1">
                        <banner-link :h4="'HOT DEAL'" :h3="'FOR MEN'"></banner-link>
                    </div>
                    <div @click="pageAPI('single')" class="banner__left_2">
                        <banner-link :h4="'LUXIROUS & TRENDY'" :h3="'ACCESSORIES'"></banner-link>
                    </div>
                </div>`
};

const bannerRight = {
    components: {bannerLink},
    props: ['pageAPI'],
    template:  `<div class="banner__right">
                    <div @click="pageAPI('single')" class="banner__right_1">
                        <banner-link :h4="'30% OFFER'" :h3="'WOMEN'"></banner-link>
                    </div>
                    <div @click="pageAPI('single')" class="banner__right_2">
                        <banner-link :h4="'NEW ARRIVALS'" :h3="'FOR KIDS'"></banner-link>
                    </div>
                </div>`
};

const appBanner = {
    components: {bannerLeft, bannerRight},
    data() {
        return {
            pageAPI: this.$root.changePage,
        };
    },
    template:  `<section class="banner center">
                    <banner-left
                        :pageAPI="pageAPI"
                    ></banner-left>
                    <banner-right
                        :pageAPI="pageAPI"
                    ></banner-right>
                </section>`
};

export default appBanner;