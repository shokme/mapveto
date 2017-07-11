<template>
    <div class="cell-sf-12">
        <div v-if="turn.first == null" class="l-grid-row l-grid-justify-center">
            <button class="btn btn-primary" @click="flip">Flip the coin</button>
        </div>
        <div v-if="turn.first !== null" class="l-grid-row l-grid-justify-center">
            <div :data-turn="turn.turn == team.my.name ? 'is_my-turn' : turn.turn == team.foe.name ? 'is_enemy-turn' : 'is_server-turn'">{{ turn.turn }} {{ turn.turn != 'Server' ? 'Turn' : 'Pick' }}</div>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            flip() {
                if(this.$store.state.socket.connected == false) {
                    this.$store.commit('SOCKET_LOGS', {message: 'Waiting user...'})
                    return this.$socket.emit('action', {type: 'check_user', room: this.$store.state.socket.room })
                }

                let coin = Math.floor(Math.random() * 2)

                if(coin == 0) {
                    this.$store.commit('SOCKET_SET_TURN', {first: this.team.my.name, second: this.team.foe.name, turn: this.team.my.name, room: this.room})
                    this.$socket.emit('action', {type: 'set_turn', first: this.team.my.name, second: this.team.foe.name, turn: this.team.my.name, room: this.room})
                } else {
                    this.$store.commit('SOCKET_SET_TURN', {first: this.team.foe.name, second: this.team.my.name, turn: this.team.foe.name, room: this.room})
                    this.$socket.emit('action', {type: 'set_turn', first: this.team.foe.name, second: this.team.my.name, turn: this.team.foe.name, room: this.room})
                }
            }
        },
        computed: {
            turn() {
                return this.$store.state.socket.turn
            },
            team() {
                return this.$store.state.socket.teams
            },
            room() {
                return this.$store.state.socket.room
            }
        }
    }
</script>