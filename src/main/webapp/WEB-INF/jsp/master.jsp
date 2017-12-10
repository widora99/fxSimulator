<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<div id="detail_area">
	<div>
		<div class="title">ユーザＩＤ</div><input type="text" id="u-id" class="head-val long" maxlength=15></input>
	</div>
	<div>
		<div class="title">パスワード</div><input type="text" id="pass" class="head-val long" maxlength=10></input>
	</div>
		<div><div class="title">氏名</div><input type="text" id="name" class="head-val long" maxlength=20></input>
	</div>
</div>
<div id="master_button_area"><button id="new_btn" class="btn btn-success">新規</button><button id="repair_btn" class="btn btn-warning">修正</button><button id="del_btn" class="btn btn-danger">削除</button></div>

<div id="grid_array"></div>

<c:url var="masterURL" value="/js/master.js" /><script src="${ masterURL }"></script>
