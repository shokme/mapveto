<template>
    <div class="cell-lt-8 cell-offset-lt-2">
        <img v-if="team == maps.my.name" v-for="(map, index) in maps.my.veto" :data-veto="vetoType(bestof, index)" :src="'images/'+map+'.png'" :alt="map">
        <img v-if="team == maps.foe.name" v-for="(map, index) in maps.foe.veto" :data-veto="vetoType(bestof, index)" :src="'images/'+map+'.png'" :alt="map">
    </div>
</template>

<script>
    export default {
        props: ['team'],
        data() {
            return {
                status: []
            }
        },
        methods: {
            vetoType(bestof, index) {
                // nextClick = ->
                // Small Error on Click
				//	WANT [0] -> [1] -> [2]
				//	Have [0] -> [0, 1] -> [0, 1, 2] -> [0, 1, ...n]
                let state = ['is_ban', 'is_ban', 'is_ban']
                if(bestof == 'Two') state[2] = 'is_pick'
                if(bestof == 'Three') state[1] = 'is_pick'

                return this.status = state[index]
            }
        },
        computed: {
            bestof() {
                return this.$store.state.socket.bestof
            },
            maps() {
                return this.$store.state.socket.teams
            }
        }
    }
</script>