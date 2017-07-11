<template>
    <div class="l-grid-row l-grid-justify-center">
        <form action="room" method="post" @submit.prevent="sendSetup()" class="cell-sf-3" >
            <div class="l-grid-row">
                <label for="my-team" class="cell-sf-12">My Team</label>
                <input type="text" id="my-team" class="cell-sf-12" v-model="my">

                <label for="foe-team" class="cell-sf-12">Opponent team name</label>
                <input type="text" id="foe-team" v-model="foe" class="cell-sf-12">

                <label for="bestof" class="cell-sf-12">Best of {{ bestof }}</label>
                <select name="bestof" id="bestof" v-model="bestof" class="cell-sf-12">
                    <option value="One" selected>One</option>
                    <option value="Two">Two</option>
                    <option value="Three">Three</option>
                </select>
                <input type="submit" class="btn cell-lt-6 cell-offset-lt-3" value="Go to Room">
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                my: '',
                foe: '',
                bestof: 'One'
            }
        },
        methods: {
            randomRoom() {
                var room = "";
                var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

                for (var i = 0; i < 7; i++) {
                    room += characters.charAt(Math.floor(Math.random() * characters.length))
                }

                return room
            },
            sendSetup() {
                this.$socket.emit('create', {
                    my: this.my,
                    foe: this.foe,
                    bestof: this.bestof,
                    room: this.randomRoom()
                })
                this.$store.commit('SET_ROOM', {
                    my: this.my,
                    foe: this.foe,
                    bestof: this.bestof,
                    room: this.randomRoom()
                })

                this.$nextTick(() => {
                    return this.$router.push('room')
                })
            }
        }
    }
</script>