const state = {
    bestof: '',
    maps: [ "de_inferno", "de_nuke", "de_cache", "de_train", "de_mirage", "de_cobblestone", "de_overpass", "de_dust2"],
    turn: {
        first: null,
        second: null,
        turn: null,
    },
    teams: {
        my: {
            name: '',
            veto:  []
        },
        foe: {
            name: '',
            veto: []
        }
    },
    logs: [],
    serverpick: null,
    status: ['', '', '', '', '', '', '', ''],
    room: null,
    connected: false
}

const actions = {
}

const mutations = {
    SET_ROOM: (state, data) => {
        state.bestof = data.bestof
        state.teams.my.name = data.my
        state.teams.foe.name = data.foe
        state.room = data.room
    },
    SOCKET_SET_SETUP: (state, data) => {
        state.bestof = data.bestof
        state.maps = data.maps
        state.turn = data.turn
        state.teams.my.name = data.teams.foe.name
        state.teams.foe.name = data.teams.my.name
        state.room = data.room
        state.connected = data.connected
    },
    SOCKET_LOGS: (state, data) => {
        state.logs.push(data.message)
    },
    SOCKET_CONNECTION: (state, data) => {
        state.room = data.room
        state.connected = data.connected
    },
    SOCKET_SET_TURN: (state, data) => {
        console.log(state)
        state.turn.first = data.first
        state.turn.second = data.second
        state.turn.turn = data.first
    },
    SOCKET_SWITCH_TURN: (state, data) => {
        if(state.turn.turn == data.foe) {
            state.turn.turn = data.my
        } else {
            state.turn.turn = data.foe
        }
    },
    SOCKET_SET_VETO: (state, data) => {
        if(data.local == true) {
            state.teams.my.veto.push(data.chosen)
        } else {
            state.teams.foe.veto.push(data.chosen)
        }
        state.status[data.index] = data.status
    },
    SOCKET_SERVER_VETO: (state, data) => {
        state.status[data.index] = data.status
    },
    SOCKET_SERVER_PICK: (state, data) => {
        state.status[data.index] = 'is_server'
        state.serverpick = data.pick
        state.turn.turn = 'Server'
    }
}

export default {
    state,
    mutations,
    actions
}