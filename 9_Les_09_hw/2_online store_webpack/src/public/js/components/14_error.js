const error = {
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
                    <span>Error!</span>
                    <span>Server is not available</span>
                    <span>{{ error }}</span>
                </div>`
};

export default error;