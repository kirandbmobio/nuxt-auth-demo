<template>
    <div>
        <b-container>
            <b-card>
                <b-row>
                    <b-col>
                        
                    </b-col>
                </b-row>
            </b-card>
        </b-container>
    </div>
</template>

<script>
export default {

    methods: {
        async getUser() {
            let id = localStorage.getItem('id')
            this.$store.dispatch('getuser')
        }
    },
    mounted() {
        this.getUser()
    },
}
</script>

