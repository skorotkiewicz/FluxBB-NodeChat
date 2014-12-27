<?php session_start();


	define('PUN_ROOT', dirname(__FILE__).'/../../');
	require PUN_ROOT.'include/common.php';

	function limiter() {
		if ( @$_SESSION['time'] < time() ) {
			$_SESSION['time'] = time()+4;
		}
		else {
			die ("Too often write messages - wait a few seconds.");
		}
	}

	limiter();

	if (!$pun_user['is_guest']) {

		$name    = $pun_user['username'];
		$message = $_POST['message'];
		$group   = $pun_user['g_id'];
		$userid  = $pun_user['id'];
		$time    = time();

		$query = $db->query( "INSERT INTO `nodechat` (`name`, `message`, `groupe`, `userid`, `data`) VALUES ('$name', '$message', '$group', '$userid', '$time');" );

	} else {
		echo 'please log in';
	}
	
?>
