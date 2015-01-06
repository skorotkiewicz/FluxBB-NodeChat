##
##        Mod title:  NodeJS Shoutbox for FluxBB
##
##       Mod version:  0.0.2
##   Works on FluxBB:  1.5.*
##      Release date:  2014-12-27
##       Review date:  2014-12-27
##            Author:  Sebastian Korotkiewicz (sebastian@korotkiewicz.eu)
##      Contributors:  Jérémy Dutheil (https://github.com/jdutheil/nodePHP)
##
##         Languages:  English
##
##      Repositories:  https://github.com/modInfo/FluxBB-NodeChat
##
##               Note:  If you are using another language, feel free to provide a translation for this MOD.
##
##    Affected files:  index.php
##
##        Affects DB:  New tables:
##                        'nodechat'
##


#
#---------[ 1. UPLOAD ]-------------------------------------------------
#

files/install_mod.php to /
files/nodechat to /

#
#---------[ 2. RUN ]----------------------------------------------------------
#

install_mod.php

#
#---------[ 3. DELETE ]-------------------------------------------------------
#

install_mod.php

#
#---------[ 4. OPEN ]-------------------------------------------------------
#

login.php

#
#---------[ 5. FIND ]-------------------------------------------------------
#

	// Update last_visit (make sure there's something to update it with)
	if (isset($pun_user['logged']))
		$db->query('UPDATE '.$db->prefix.'users SET last_visit='.$pun_user['logged'].' WHERE id='.$pun_user['id']) or error('Unable to update user visit data', __FILE__, __LINE__, $db->error());


#
#---------[ 6. AFTER ADD ]---------------------------------------------------------
#

		$db->query('UPDATE '.$db->prefix.'users SET token = \''.md5(uniqid(rand(time(), true))).'\' WHERE id='.$pun_user['id']) or error('Unable to update user visit data', __FILE__, __LINE__, $db->error());

#
#---------[ 7. OPEN ]---------------------------------------------------------
#

/nodechat/js/nodeServer.js

#
#---------[ 8. CONFIGURE IT ]---------------------------------------------------------
#

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : '',
  password : '',
  database : 'forum'
});

#
#---------[ 9. OPEN ]---------------------------------------------------------
#

/nodechat/index.php

#
#---------[ 10. CONFIGURE IT ]---------------------------------------------------------
#

var socket = io.connect('http://example.com:8080', {query : 'token=<?php echo $token; ?>'}); //change it

#
#---------[ 10. START NODE ]---------------------------------------------------------
#

node /nodechat/js/nodeServer.js
