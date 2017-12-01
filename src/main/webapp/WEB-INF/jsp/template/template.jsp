<!DOCTYPE HTML>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<html>
	<head>
		<title><tiles:insertAttribute name="title" ignore="true"/></title>
		<meta name="description" content="<tiles:insertAttribute name="pageDescription" ignore="true"/>">		
		<tiles:insertAttribute name="css" />
		<tiles:insertAttribute name="custom_css" />
		<link rel="icon" href="<c:url value="/img/sample.ico"/>" type="image/vnd.microsoft.icon" />
		<link rel="shortcut icon" href="<c:url value="/img/sample.ico"/>" type="image/vnd.microsoft.icon" />
		<meta charset="utf-8">
		<meta property="og:image" content="<tiles:insertAttribute name="og_image" ignore="true"/>" />
		<meta property="og:title" content="<tiles:insertAttribute name="og_title" ignore="true"/>" />
		<meta property="og:description" content="<tiles:insertAttribute name="og_desc" ignore="true"/>"/>
		<link rel="stylesheet" href="<tiles:insertAttribute name="jquery_ui_css" ignore="true"/>" /> 
		<tiles:insertAttribute name="js" />
		<tiles:insertAttribute name="custom_js" />
	</head>
    <body>
    	<div id="header">
			<tiles:insertAttribute name="header" />
		</div>
	<div id="container">
		<div id="page">
			<tiles:insertAttribute name="content" />
		</div>
	</div>
	<div id="footer" class="sidebar_open">
		<tiles:insertAttribute name="footer" />
	</div>
</body>
</html>