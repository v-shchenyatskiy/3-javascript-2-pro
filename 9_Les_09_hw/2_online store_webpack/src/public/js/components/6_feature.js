const featureLeft = {
    template:  `<div class="feature__left">
                    <div class="feature__left_content">
                        <h2 class="feature__left_h2">30% <span class="feature__left_h2-offer">OFFER</span></h2>
                        <h3 class="feature__left_h3">FOR WOMEN</h3> </div>
                    <div class="feature__left_bg"><img src="img/5_index_feature/feature_bg.png" alt="feature_bg.png"></div>
                </div>`
};

const feature = {
    props: ['title', 'idx','content'],
    data() {
        return {
            srcEl: 'img/5_index_feature/',
            end: '_feature_icon.png',
        };
    },
    template:  `<div class="feature__right_box">
                    <img :src="srcEl+idx+end" :alt="idx+end">
                    <div class="feature__right_content">
                        <h4 class="feature__right_content_h4">{{ title }}</h4>
                        <h5 class="feature__right_content_h5">{{ content }}</h5>
                    </div>
                </div>`
};

const featureRight = {
    components: {feature},
    data() {
        return {
            titles: ['Free Delivery', 'Sales & Discounts', 'Quality Assurance'],
            contentPlug: "Worldwide delivery on all. Authorit tively morph next-generation innov tion with extensive models.",
        };
    },
    template:  `<div class="feature__right">
                    <feature
                        v-for="(title, idx) in titles"
                        :title="title"
                        :idx="idx"
                        :content="contentPlug"
                    ></feature>
                </div>`
};

const appFeature = {
    components: {featureLeft, featureRight},
    data() {
        return {
            pageAPI: this.$root.changePage,
        };
    },
    template:  `<section class="feature center">
                    <div @click="pageAPI('checkout')" class="feature_back">
                        <feature-left></feature-left>
                        <feature-right></feature-right>
                    </div>
                </section>`
};

export default appFeature;