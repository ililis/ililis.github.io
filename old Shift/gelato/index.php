<?php include 'worker.php';?>
<!DOCTYPE html>
<html>
<head>
	<title>Gelato Lyrics</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<link rel="stylesheet" type="text/css" href="css/mycss.css">
	<style>
		
	</style>
</head>
	
<body>
	<div class="header">

		<div class="search">
			<p class="divhider"><br></p>
			<input id="inputsearch" placeholder="Поиск" onkeyup="searchKey()" type="text" name="">
		</div>

		<div class="welcome" onclick="location.reload()">
					<p id="welcometext">Welcome to Gelato Lyrics</p>
		</div>
			<div id="login" onclick="clicklogin()">
				<p class="divhider"><br></p>
				<p id="logintext">Профиль</p>
			</div>
		</div>
	
	<div class="navigate">
			<div id="folderslabel">Разделы: </div>
			<div id="addfolder" class="add hoverbutton"><p>+</p></div>
		<br><br>
		<div class="folders" id="folders">

		</div>
		<div id="folderslabel"> Композиции: </div>
		<div id="addtrack" class="add hoverbutton"> + </div>
		<br><br>
        <div class="tracks" id="tracks">

        </div>

	</div>
	<div id="divforloginform" class="divforloginform">

	</div>
	<div class="mainblock" id="mainblock">
		
	</div>
	<footer><p id="footertext">По всем вопросам обращаться на почту mail@mail.com</p></footer>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script type="text/javascript" src="js/mainscript.js"></script>

</body>
</html>
