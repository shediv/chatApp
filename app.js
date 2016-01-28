var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var usernames = [];

server.listen(5555);

app.get('/', function(req, res){
	res.sendfile('index.html');

})


io.sockets.on('connection', function(socket){
	socket.on('new user', function(data, callback){
		if(usernames.indexOf(data) != -1){
			callback(false);
		}else{
			callback(true);
			socket.username = data;
			usernames.push(socket.username);
			//io.sockets.emit('usernamesList', usernames)
			updateUsernames();
		}
	})

	socket.on('sending msg', function(data){
		io.sockets.emit('new message', {msg :data, username : socket.username});
		//sockets.broadcast.emit('new')
	})

	function updateUsernames() {
		io.sockets.emit('usernamesList', usernames)	
	}


	socket.on('disconnect', function(data){
		if(!socket.username) return;
		usernames.splice(usernames.indexOf(socket.username), 1);
		updateUsernames();
	})
})
