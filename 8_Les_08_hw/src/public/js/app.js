import products from './components/0_products.js';
import cart from './components/1_cart.js';
import search from './components/2_search.js';
import error from './components/3_error.js';

const app = {
    el: "#app",
    components: {
        products,
        cart,
        search,
        error,
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
    },
};

export default app;