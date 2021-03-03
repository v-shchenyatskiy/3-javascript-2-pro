const footerLeft = {
    props: ['pageAPI'],
    data() {
        return {
            p: `Objectively transition extensive data rather than cross functional solutions. Monotonectally syndicate multidisciplinary materials before go forward benefits. Intrinsicly syndicate an expanded array of processes and cross-unit partnerships.<br><br>Efficiently plagiarize 24/365 action items and focused infomediaries. Distinctively seize superior initiatives for wireless technologies. Dynamically optimize.`,
        };
    },
    template:  `<article class="footer_content__left">
                    <div @click="pageAPI('index')" class="footer_content__left_link">
                        <img class="footer_content__left_link-img" src="img/7_footer/1_logo.png" alt="1_logo.png">
                        <h3 class="footer_content__left_link_h3">BRAN<span class="footer_content__left_link_h3-d">D</span></h3>
                    </div>
                    <p class="footer_content__left_p">{{ p }}</p>
                </article>`
};

const footerLink = {
    props: ['title', 'pageAPI'],
    data() {
        return {
            classEl: "footer__link",
        };
    },
    computed: {
        pageLink() {
            if (this.title == 'Home') { return "index"; } else { return "checkout"; };
        },
    },
    template:  `<span @click="pageAPI(pageLink)" :class="classEl">{{ title }}</span>`
};

const footerTitles = {
    components: {footerLink},
    props: ['h1','titles','pageAPI'],
    template:  `<ul class="footer__list">
                    <span class="footer__header">{{ h1 }}</span>
                    <footer-link
                        v-for="title in titles"
                        :title="title"
                        :pageAPI="pageAPI"
                    ></footer-link>
                </ul>`
};

const footerRight = {
    components: {footerTitles},
    props: ['pageAPI'],
    data() {
        return {
            titles: {
                blockA: ["Home","Shop", "About", "How It Works", "Contact"],
                blockB: ["Tearms & Condition", "Privacy Policy", "How to Buy", "How to Sell", "Promotion"],
                blockC: ["Men", "Women", "Child", "Apparel", "Browse All"],
            },
        };
    },
    template:  `<nav class="footer_content__right">
                    <footer-titles
                        :h1="'COMPANY'"
                        :titles="titles.blockA"
                        :pageAPI="pageAPI"
                    ></footer-titles>
                    <footer-titles
                        :h1="'INFORMATION'"
                        :titles="titles.blockB"
                        :pageAPI="pageAPI"
                    ></footer-titles>
                    <footer-titles
                        :h1="'SHOP CATEGORY'"
                        :titles="titles.blockC"
                        :pageAPI="pageAPI"
                    ></footer-titles>
                </nav>`
};

const copyright = {
    template:  `<footer class="footer_copyrights center">
                    <div class="footer_copyrights__l">
                        <p class="footer_copyrights__l_p">&copy; 2021 Brand All Rights Reserved.</p>
                    </div>
                    <div class="footer_copyrights__r">
                        <a href="#" class="footer__social_links"><i class="fab fa-facebook-f"></i></a>
                        <a href="#" class="footer__social_links"><i class="fab fa-twitter"></i></a>
                        <a href="#" class="footer__social_links"><i class="fab fa-linkedin-in"></i></a>
                        <a href="#" class="footer__social_links"><i class="fab fa-pinterest-p"></i></a>
                        <a href="#" class="footer__social_links"><i class="fab fa-google-plus-g"></i></a>
                    </div>
                </footer>`
};


const appFooter = {
    components: {footerLeft, footerRight, copyright},
    data() {
        return {
            pageAPI: this.$root.changePage,
        };
    },
    template:  `<footer class="footer_content center">
                    <footer-left
                        :pageAPI="pageAPI"
                    ></footer-left>
                    <footer-right
                        :pageAPI="pageAPI"
                    ></footer-right>
                    <copyright></copyright>
                </footer>`
};

export default appFooter;