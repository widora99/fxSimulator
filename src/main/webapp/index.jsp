<!DOCTYPE html>
<html lang="ja">
	<head>
		<meta charset="utf-8">
		<%@ page language="java" contentType="text/html; charset=UTF-8" %>
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<!--  <link rel="shortcut icon" href="img/sample.ico" type="image/vnd.microsoft.icon" />-->
		<link rel="stylesheet" media="screen" href="css/lib/bootstrap.css">
		<link rel="stylesheet" media="screen" href="css/index.css">
		<script src='js/lib/jquery.js'></script>
		<script src='js/index.js'></script>
	</head>
	<body>
		<div id="loginarea">
			<form action="/fxSimulator/login" method="POST">
				<div><span class="login_title">FX検証システム</span></div>
				<div><input id="userid" type="text" placeholder="id" name="userid"></div>
				<div><input id="password" type="password" placeholder="password" name="password"></div>
				<div><a href="main"><button type="submit" class="btn btn-info">Login</button></a></div>
				<div><span class="errmsg">${ msg }</span></div>
			</form>
		</div>
	</body>
</html>