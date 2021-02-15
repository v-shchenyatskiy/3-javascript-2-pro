'use strict';

const app = new Vue({
    el: "#app",
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
});