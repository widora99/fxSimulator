<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<div id="link_area"><a href="/fxSimulator/master"><button id="master_link" class="btn btn-primary">管理画面</button></a><a href="/fxSimulator/main"><button id="main_link" class="btn btn-primary">検証画面</button></a><a href="/fxSimulator/result1"><button id="result1_link" class="btn btn-primary">記録画面①</button></a><a href="/fxSimulator/result2"><button id="result2_lik" class="btn btn-primary">記録画面②</button></a></div>
<div id="button_area"><button id="add_btn" class="btn btn-info"><i class="fa fa-plus"></i></button><button id="del_btn" class="btn btn-danger"><i class="fa fa-minus"></i></button><button id="clear_btn" class="btn btn-primary">クリア</button><button id="save_btn" class="btn btn-success">保存</button><button id="exp_btn" class="btn btn-warning">CSV</button></div>
<div><a href="/fxSimulator"><button id="logout_btn" class="btn btn-warning">ログアウト</button></a></div>
<script>var auth = "${auth}";</script>
