const breadcrumbLink = {
    props: ['title'],
    computed: {
        classEl() {
            if (this.title == "New Arrivals") { return "breadcrumb__right_link-active"; } else { return "breadcrumb__right_link"; }
        },
    },
    template:  `<a href="../index.html">
                    <span :class="classEl">{{ title + '&nbsp;/&nbsp;' }}</span>
                </a>`
};

const appBreadcrumb = {
    components: {breadcrumbLink},
    data() {
        return {
            h2: "New Arrivals",
            titles: ["Home", "Men", "New Arrivals"],
        };
    },
    template:  `<nav class="p2_breadcrumb center">
                    <div class="breadcrumb__left">
                        <h2 class="breadcrumb__left_h2">{{ h2 }}</h2>
                    </div>
                    <div class="breadcrumb__right">
                        <breadcrumb-link
                            v-for="title in titles"
                            :title="title"
                        ></breadcrumb-link>
                    </div>
                </nav>`
};

export default appBreadcrumb;