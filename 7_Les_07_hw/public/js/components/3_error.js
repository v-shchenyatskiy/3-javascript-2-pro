'use strict';

Vue.component('error', {
    data() {
        return {
            error: "",
            isActive: false,
        };
    },
    methods: {
        activateModal(error) {
            this.error = error;
            this.isActive = true;
        
            setTimeout(() => {
                this.isActive = false;
                this.error = "";
            }, 2000);
        },
    },
    template:  `<div v-if="isActive" class="modal">
                    <span>Ошибка!</span>
                    <span>Сервер не доступен</span>
                    <span>{{ error }}</span>
                </div>`
});