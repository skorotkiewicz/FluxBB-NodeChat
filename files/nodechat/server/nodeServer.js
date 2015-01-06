var socket  = require( 'socket.io' );
var express = require( 'express' );
var http    = require( 'http' );
var mysql   = require( 'mysql' );

var app = express();
var server = http.createServer( app );

var io = socket.listen( server );

var clients = {};
var sockets = {};


// CONFIG
//////////////////////////////////////////////////

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : '',
  password : '',
  database : 'forum'
});

connection.connect();
//////////////////////////////////////////////////

var save_message = function(message_from, message_name, message_content, callback) {
  var message_time = parseInt((new Date().getTime())/1000, 10);
  var post  = { userid: message_from, name: message_name, message: message_content, data: message_time };
  connection.query('INSERT INTO nodechat SET ?', post, callback);
};

//////////////////////////////////////////////////

//get user that matches the token
var get_user_by_token = function(token, callback) {
  connection.query('SELECT * FROM users WHERE token = ? LIMIT 1', [token], callback);
};


//////////////////////////////////////////////////
//////////////////////////////////////////////////

io.sockets.on( 'connection', function( socket ) {
  clients[socket.id] = {};

    get_user_by_token(socket.handshake.query.token, function(err, result) {
      if (err) return callback(err);

          if (0 == result.length) {
            socket.emit('auth_login_response', 0);
            return;
          }
    
          //if user found, add user details in clients object
          clients[socket.id] = {
            user_username: result[0].username,
            user_id: result[0].id
          };
          sockets[result[0].id] = socket;

    });



  //message sent event
  socket.on('message', function(message_content) {
    //get user id of sender
    message_userid   = clients[socket.id].user_id;
    message_name = clients[socket.id].user_username;
      if (message_userid && message_userid != '1') {
         if (message_content.message.length >= 1) {
		  //save the message to db
		  save_message(message_userid, message_name, message_content.message, function(err, message_id) {
		    //if there is a socket to send to
		      io.sockets.emit('message', { name: message_name, message: message_content.message, id: message_userid });
		  });
         } else {
            socket.emit('information', { info: 'enter your msg' });
         }
      } else {
          socket.emit('information', { info: 'please log <a href="/login.php">in</a>' });
      }
  });
});

server.listen( 8080 );
