<?php 

	define('PUN_ROOT', dirname(__FILE__).'/../');
	require PUN_ROOT.'include/common.php';

?>

<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<meta content="width=device-width, initial-scale=1.0" name="viewport">
		
		<title>NodeJS + FluxBB</title>
	
		<link rel="stylesheet" href="css/bootstrap.css" />
		<style type="text/css">body { padding-top: 60px; }</style>
		<link rel="stylesheet" href="css/bootstrap-responsive.css" />
		<link rel="stylesheet" href="css/index.css" />
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	</head>

	<body>
		<div class="navbar navbar-inverse navbar-fixed-top">
			<div class="navbar-inner">
				<div class="container">
					<a class="brand" href="index.php">FluxBB_NodeChat</a>
					
				</div>
			</div>
		</div>
		
		<div class="container">
			<h1>Integration NodeJS + FluxBB</h1>
			<p>
				To talk, log in to your FluxBB forum
			</p>
						
			<div>


				<div id="shoutboxHeader" class="shoutboxLarge">Shoutbox</div>
				<div id="shoutbox" style="padding:0px;width:100%;height:250px;position: static; z-index: auto; visibility: visible; overflow: auto;font-size:11px">
					<div id="shoutboxContents">

						<ul id="messages">
							<?php $query = $db->query('SELECT * FROM (SELECT * FROM nodechat ORDER BY id DESC LIMIT 40) t ORDER BY id ASC;'); ?>

							<?php foreach($query as $row): ?>
								<li><?php echo date('H:i', $row['data']); ?> | <a href="http://forum.itunix.eu/profile.php?id=<?php echo $row['userid']; ?>"><strong><?php echo $row['name']; ?></strong></a> : <?php echo $row['message']; ?></li>
							<?php endforeach; ?>
						</ul>

					</div>
				</div>

			</div>
			<!-- End #messages -->

			<form class="form-inline" id="messageForm">
				<input id="nameInput" type="hidden" class="input-medium" value="<?=$pun_user['username']?>" />
				<input id="groupInput" type="hidden" class="input-medium" value="<?=$pun_user['g_id']?>" />
				<input id="idInput" type="hidden" class="input-medium" value="<?=$pun_user['id']?>" />
				<input id="messageInput" type="text" class="input-xxlarge" placeHolder="Message" />
			
				<input type="submit" value="Send" />
			</form>

			<div id="errorjs" style="color:red;font-size:11px;"></div>
			<div id="errorphp" style="color:red;font-size:11px;"></div>
		</div>
		
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js" ></script>
		<script src="js/bootstrap.js"></script>
		<script src="js/node_modules/socket.io/node_modules/socket.io-client/dist/socket.io.js"></script>
		<script src="js/nodeClient.js"></script>
	</body>
</html>
