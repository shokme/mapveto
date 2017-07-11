<template>
    <section id="room" class="l-grid-row l-grid-justify-center">
        <maps></maps>
        <div class="cell-sf-12 cell-tb-6 cell-lt-8">
            <turn></turn>
            <div class="l-grid-row">
                <div class="cell-sf-12 cell-lt-4">
                    <logbox></logbox>
                    <map-played></map-played>
                </div>
                <div v-if="turn.turn != null" class="cell-sf-6 cell-lt-4 cell-align-center">
                    <span class="team">{{ team.my.name }}</span>
                    <div class="l-grid-row">
                        <team-veto :team="team.my.name"></team-veto>
                    </div>
                </div>
                <div v-if="turn.turn != null" class="cell-sf-6 cell-lt-4 cell-align-center">
                    <span class="team">{{ team.foe.name }}</span>
                    <div class="l-grid-row">
                        <team-veto :team="team.foe.name"></team-veto>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import maps from './Maps'
    import turn from './Turn'
    import logbox from './Logbox'
    import mapPlayed from './MapPlayed'
    import teamVeto from './TeamVeto'

    export default {
        mounted() {
            if(this.$store.state.socket.room == null && location.search == '') {
                return this.$router.push('/')
            }
            if (location.search != '' && location.search.substring(1, 5) === 'join') {
                var room = location.search.substring(6)
                this.$socket.emit('join', room)
            }
            this.$options.sockets.action = (data) => {
                if(data.type == 'user_join_room') return this.$socket.emit('action', {type: 'send_data', data: this.$store.state.socket})
                if(data.type == 'room_not_exist') return this.$router.push('/')
            }
        },
        sockets: {
            disconnect() {
                io.emit('disconnect', {message: 'Disconnected by myself'})
            }
        },
        components: {
            maps,
            turn,
            logbox,
            mapPlayed,
            teamVeto
        },
        computed: {
            team() {
                return this.$store.state.socket.teams
            },
            turn() {
                return this.$store.state.socket.turn
            }
        }
    }
</script>