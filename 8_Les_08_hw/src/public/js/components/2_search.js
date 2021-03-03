const search = {
    data() {
        return {
            value: "",
        };
    },
    template:  `<div class="search">
                    <input type="text"
                        v-model="value"
                        v-on:input="$root.$refs.products.filterProducts(value)"
                    >
                    <span>&#128270;</span>
                </div>`
};

export default search;