<template>
    <div class="l-grid-row log-box" id="logbox">
        <div class="cell-sf-12 cell-tb-6 cell-lt-12">
            <span v-for="log in logs">{{ log }}</span>
        </div>
    </div>
</template>
<script>
    export default {
        updated() {
            this.logBox()
        },
        methods: {
            logBox() {
                let elem = document.getElementById("logbox")
                elem.scrollTop = elem.scrollHeight
            },
        },
        computed: {
            logs() {
                return this.$store.state.socket.logs
            }
        }
    }
</script>