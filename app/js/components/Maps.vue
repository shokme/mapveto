<template>
    <div class="cell-sf-12 cell-tb-6 cell-lt-12">
        <div id="veto-img" class="l-grid-row l-grid-justify-center">
            <img :data-veto="status[index]" v-for="(map, index) in maps" @click="veto(map, index)" class="cell-sf-3 cell-tb-6 cell-lt-1 img-maps" :src="'images/'+map+'.png'" :alt="map">
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isSet: false,
                state: ['is_ban', 'is_ban', 'is_ban'],
            }
        },
        mounted() {
            this.$options.sockets.action = (data) => {
                if(data.type == 'update') this.$set(this.status, data.data.index, this.state[this.team.foe.veto.length])
                if(data.type == 'server') {
                    this.$set(this.status, data.data.index, data.data.status)
                    this.$store.commit('SOCKET_SERVER_PICK', data.data)
                }
            }
        },
        updated() {
            if(this.isSet === false) {
                if(this.bestof == 'Two') this.state[2] = 'is_pick'
                if(this.bestof == 'Three') this.state[1] = 'is_pick'
                this.isSet = true
            }
        },
        methods: {
            veto(map, index) {
                if(this.$store.state.socket.connected == false) {
                    this.$store.commit('SOCKET_LOGS', {message: 'Waiting user...'})
                    return this.$socket.emit('action', {type: 'check_user', room: this.$store.state.socket.room })
                }

                if(parseInt(this.team.my.veto.length + this.team.foe.veto.length) == 6) {
                    return this.$store.commit('SOCKET_LOGS', {message: 'The veto is finished.'})
                }

                if(this.team.my.name != this.turn.turn) {
                    return this.$store.commit('SOCKET_LOGS', {message: 'Wait your turn...'})
                }

                if(this.team.my.veto.indexOf(map) === -1 && this.team.foe.veto.indexOf(map) === -1) {
                    // VETO Maps
                    this.$store.commit('SOCKET_SET_VETO', {local: true, index: index, chosen: map, status: this.state[this.team.my.veto.length]})
                    this.$socket.emit('action', {type: 'set_veto', index: index, chosen: map, status: this.state[this.team.my.veto.length-1], room: this.$store.state.socket.room})
                    // Update Colors
                    this.$set(this.status, index, this.state[this.team.my.veto.length-1])
                    // Switch Turn
                    this.$store.commit('SOCKET_SWITCH_TURN', {my: this.team.my.name, foe: this.team.foe.name})
                    this.$socket.emit('action', {type: 'switch_turn', my: this.team.my.name, foe: this.team.foe.name, room: this.$store.state.socket.room})
                    // Logs Veto
                    let state = ''
                    if(this.state[this.team.my.veto.length-1] == 'is_pick') {
                        state = 'picked'
                    } else {
                        state = 'banned'
                    }
                    this.$store.commit('SOCKET_LOGS', {message: 'You ' + state + ' ' + map})
                    this.$socket.emit('logs', {message: this.team.my.name + ' ' + state + ' ' + map, room: this.$store.state.socket.room})
                    // Server Pick
                    if(parseInt(this.team.my.veto.length + this.team.foe.veto.length) == 6) {
                        if(this.bestof == 'Three' || this.bestof == 'One') {
                            let pool = this.team.my.veto.concat(this.team.foe.veto)
                            let difference = this.maps.filter(x => pool.indexOf(x) == -1);
                            let pick = difference[Math.floor(Math.random() * difference.length)]
                            let index = this.maps.indexOf(pick)

                            this.status[index] = 'is_server'
                            this.$socket.emit('action', {type: 'set_server_pick', index: index, pick: pick, room: this.$store.state.socket.room})
                            this.$store.commit('SOCKET_SERVER_PICK', {index: index, pick: pick})
                            // Logs
                            this.$store.commit('SOCKET_LOGS', {message: 'Server picked ' + pick})
                            this.$socket.emit('logs', {message: 'Server picked ' + pick, room: this.$store.state.socket.room})
                        }
                    }
                }
            }
        },
        computed: {
            status() {
                return this.$store.state.socket.status
            },
            bestof() {
                return this.$store.state.socket.bestof
            },
            team() {
                return this.$store.state.socket.teams
            },
            maps() {
                return this.$store.state.socket.maps
            },
            turn() {
                return this.$store.state.socket.turn
            }
        }
    }
</script>