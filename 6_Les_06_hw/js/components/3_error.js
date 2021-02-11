'use strict';

Vue.component('error', {
    data() {
        return {
            isActive: false,
        };
    },
    methods: {
        activateModal() {
            this.isActive = true;
            setTimeout(() => this.isActive = false, 2000);
        },
    },
    template:  `<div v-if="isActive" class="modal">
                    <span>Ошибка!</span>
                    <span>Сервер не доступен</span>
                </div>`
});