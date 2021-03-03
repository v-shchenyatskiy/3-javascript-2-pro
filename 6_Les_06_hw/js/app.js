'use strict';

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: "#app",
    methods: {
        getJSON(url) {
            return fetch(url)
                .then( response => response.json() )
                .catch(error => {
                    this.$refs.error.activateModal();
                    console.log(error);
                });
        },
    },
});