import { pageIndex, pageCheckout, pageSingle, pageCart, pageCatalog } from './components/0_pages.js';
import error from './components/14_error.js';

const app = {
    el: "#app",
    components: {
        pageIndex, pageCheckout, pageSingle, pageCart, pageCatalog,
        error,
    },
    data() {
        return {
            currentPage: "index",
            pages: ["index", "single", "checkout", "cart", "catalog"],
      };
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then( response => response.json() )
                .catch(error => {
                    this.$refs.error.activateModal(error);
                });
        },
        httpJson(url, data, method) {
            return fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            .then( response => response.json() )
            .catch(error => {
                this.$refs.error.activateModal(error);
            });
        },
        changePage(page) {
            this.currentPage = page;
        },
    },
    computed: {
        currentPageComp() {
            return "page-" + this.currentPage;
        },
    },
};

export default app;