var socket = io.connect( 'http://example.com:8080' ); //change it
var date = new Date();

$( "#messageForm" ).submit( function() {
	var nameVal = $( "#nameInput" ).val();
	var msg = $( "#messageInput" ).val();
	var groupVal = $( "#groupInput" ).val();
	var idVal = $( "#idInput" ).val();
        var c = $("#messageInput").val();
	var maxMessageLength = 255;


	if(c.trim().length > maxMessageLength){
		$('#errorjs').html( 'msg to long, max 255 char' );
	} else if(c.trim().length < maxMessageLength && c.trim().length != 0 && idVal > 1){
		// send to node
		socket.emit( 'message', { name: nameVal, message: msg, group: groupVal, id: idVal } );
		// Ajax call for saving datas
		$.ajax({
			url: "/nodechat/ajax/insertNewMessage.php",
			type: "POST",
			data: { message: msg },
			success: function(data) {
				$('#errorphp').html( data );
				$('#messageInput').val("");
				$('#shoutbox').scrollTop(100000);
			}
		});
	} else {
		$('#errorjs').html( 'enter a msg' );
	}

	return false;
});

$('#shoutbox').scrollTop(100000);


socket.on( 'message', function( data ) {
	var time=('0'  + date.getHours()).slice(-2)+':'+('0' + date.getMinutes()).slice(-2);

	var actualContent = $( "#messages" ).html();
	var newMsgContent = '<li>' + time + ' | <a href="/profile.php?id=' + data.id + '"><strong>' + data.name + '</strong></a> : ' + data.message + '</li>';
	var content = actualContent + newMsgContent;

	$( "#messages" ).html( content );
	$( '#shoutbox' ).scrollTop(100000);
});

