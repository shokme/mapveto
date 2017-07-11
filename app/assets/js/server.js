var expressVue = require('express-vue')
var express = require('express')
var app = express()
var server = require('http').Server(app)
var io = require('socket.io')(server)
var path = require('path')
var history = require('connect-history-api-fallback')

var port = process.env.PORT || 5000
server.listen(port)
console.log("HTTP server listening on %d", port)

app.use(express.static('public'))
app.use(history({
    disableDotRule: true,
    verbose:        true
}))
app.use(express.static('public'))

var roomName = [];

io.on('connection', function (socket) {
    // Room Creation
    socket.on('create', function(data) {
        if(roomName.indexOf(data.room) === -1) {
            roomName.push(data.room)
        }

        socket.join(data.room)

        socket.emit('LOGS', {message: "The room '"+data.room+'" has been created.'})
        return socket.emit('LOGS', {message: "Waiting for the second user."})
    })
    // Room Joining
    socket.on('join', function(room) {
        //If Room doesn't Exist
        if(roomName.indexOf(room) === -1) {
            return socket.emit('action', {type: "room_not_exist"})
        }
        //Join Room
        socket.join(room)
        socket.in(room).emit('CONNECTION', {connected: true, room: room})
        socket.emit('LOGS', {message: "You have successfully joined the room '"+ room +"'"})
        socket.to(room).emit('action', {type: 'user_join_room'})
        return socket.to(room).emit('LOGS', {message: "The user is logged in, you can now start the veto."})
    })
    // Room Action
    socket.on('action', function(data) {
        if(data.type == 'send_data') {
            return socket.to(data.data.room).emit('SET_SETUP', data.data)
        }

        if(data.type == 'check_user') {
            if(data.room != undefined && io.sockets.adapter.rooms[data.room] != undefined) {
                if(io.sockets.adapter.rooms[data.room].length < 2) {
                    return socket.emit('LOGS', {message: "Waiting for the second user."})
                }
            }
        }

        if(data.type == 'set_turn') {
            return socket.to(data.room).emit('SET_TURN', data)
        }

        if(data.type == 'switch_turn') {
            return socket.in(data.room).emit('SWITCH_TURN', data)
        }

        if(data.type == 'set_veto') {
            socket.to(data.room).emit('action', {type: 'update', data: data})
            return socket.to(data.room).emit('SET_VETO', data)
        }

        if(data.type == 'set_server_pick') {
            return socket.to(data.room).emit('action', {type: 'server', data: data})
        }

        return;
    })

    socket.on('logs', function (data) {
        return socket.to(data.room).emit('LOGS', data)
    })

    socket.on('disconnect', function(socket) {
        roomName.forEach(function(room) {
            if(io.sockets.adapter.rooms[room] == undefined) {
                roomName.splice(roomName.indexOf(room), 1)
            }
        })
    })
})