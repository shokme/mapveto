<template>
    <div class="l-grid-row map-veto">
        <div v-if="turn.first == team.my.name" class="cell-sf-12 cell-tb-6 cell-lt-12">
            <span>{{ bestof != 'One' ? 'First map is' : 'The map is' }} <strong>{{ bestof != 'One' ? bestof == 'Two' ? team.my.veto[2] : team.my.veto[1] : server }}</strong> </span>
            <span v-show="bestof != 'One'">{{ bestof != 'Two' ? 'The second map is' : 'The last map is' }} <strong>{{ bestof != 'Two' ? team.foe.veto[1] : team.foe.veto[2] }}</strong> </span>
            <span v-show="bestof == 'Three'">Last map is <strong>{{ server }}</strong> </span>
        </div>
        <div v-else="" class="cell-sf-12 cell-tb-6 cell-lt-12">
            <span>{{ bestof != 'One' ? 'First map is' : 'The map is' }} <strong>{{ bestof != 'One' ? bestof == 'Two' ? team.foe.veto[2] : team.foe.veto[1] : server }}</strong></span>
            <span v-show="bestof != 'One'">{{ bestof != 'Two' ? 'The second map is' : 'The last map is' }} <strong>{{ bestof != 'Two' ? team.my.veto[1] : team.my.veto[2] }}</strong> </span>
            <span v-show="bestof == 'Three'">Last map is <strong>{{ server }}</strong></span>
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
            bestof() {
                return this.$store.state.socket.bestof
            },
            server() {
                return this.$store.state.socket.serverpick
            },
            turn() {
                return this.$store.state.socket.turn
            },
            team() {
                return this.$store.state.socket.teams
            }
        }
    }
</script>