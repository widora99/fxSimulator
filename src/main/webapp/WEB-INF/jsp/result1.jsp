<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<div id="grid_array"></div>
<div id="button_area"><button id="save_btn" class="btn btn-info">保存</button><button id="exp_btn" class="btn btn-success">CSV</button></div>

<c:url var="resultURL" value="/js/result1.js" /><script src="${ resultURL }"></script>