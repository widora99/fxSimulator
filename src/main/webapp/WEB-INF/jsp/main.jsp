<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<div id="summary_area">
	<div class="title">通貨ペア</div><div id="c-pair" class="head-val" contenteditable=true>USDJPY</div>
	<div class="title">時間足</div><div id="period" class="head-val" contenteditable=true>1分足</div>
	<div class="title">検証期間</div><div id="term" class="head-val" contenteditable=true>2/7～3/3</div>
</div>
<div>
	<div class="title">条件</div><textarea id="condition" class="head-val long">xxxxな方法</textarea>
</div>
<div>
	<div class="title">条件名</div><div class="title">トレード回数</div><div class="title">勝率</div>
</div>
<div id="max-trade-area">
	<div class="title">１日最大トレード回数</div>
	<div id="max-trade">　</div>
</div>
<div class="rule_result">
	<div class="title"><input id="rule1" type="text" class="head-val" placeholder="条件①"></input></div><div id="rulenum1" class="head-val">0</div><div id="ruleper1" class="head-val">0</div>
</div>
<div class="rule_result">
	<div class="title"><input id="rule2" type="text" class="head-val" placeholder="条件②"></input></div><div id="rulenum2" class="head-val">0</div><div id="ruleper2" class="head-val">0</div>
</div>
<div class="rule_result">
	<div class="title"><input id="rule3" type="text" class="head-val" placeholder="条件③"></input></div><div id="rulenum3" class="head-val">0</div><div id="ruleper3" class="head-val">0</div>
</div>

<div>
	<div class="title">　</div>
	<div class="title short win">2連勝</div><div class="title short win">3連勝</div><div class="title short win">4連勝</div><div class="title short win">5連勝</div><div class="title short win">6連勝</div><div class="title short win">7連勝</div><div class="title short win">8連勝</div><div class="title short win">9連勝</div><div class="title short win">10連勝</div>
	<div class="title short loose">2連敗</div><div class="title short loose">3連敗</div><div class="title short loose">4連敗</div><div class="title short loose">5連敗</div><div class="title short loose">6連敗</div><div class="title short loose">7連敗</div><div class="title short loose">8連敗</div><div class="title short loose">9連敗</div><div class="title short loose">10連敗</div>
</div>
<div>
	<div id="div-rule1" class="title">条件①</div>
	<div class="head-val short">0</div><div class="head-val short">0</div><div class="head-val short">0</div><div class="head-val short">0</div><div class="head-val short">0</div><div class="head-val short">0</div><div class="head-val short">0</div><div class="head-val short">0</div><div class="head-val short">0</div>
	<div class="head-val short">0</div><div class="head-val short">0</div><div class="head-val short">0</div><div class="head-val short">0</div><div class="head-val short">0</div><div class="head-val short">0</div><div class="head-val short">0</div><div class="head-val short">0</div><div class="head-val short">0</div>
</div>
<div>
	<div id="div-rule2" class="title">条件②</div>
	<div class="head-val short">0</div><div class="head-val short">0</div><div class="head-val short">0</div><div class="head-val short">0</div><div class="head-val short">0</div><div class="head-val short">0</div><div class="head-val short">0</div><div class="head-val short">0</div><div class="head-val short">0</div>
	<div class="head-val short">0</div><div class="head-val short">0</div><div class="head-val short">0</div><div class="head-val short">0</div><div class="head-val short">0</div><div class="head-val short">0</div><div class="head-val short">0</div><div class="head-val short">0</div><div class="head-val short">0</div>
</div>
<div>
	<div id="div-rule3" class="title">条件③</div>
	<div class="head-val short">0</div><div class="head-val short">0</div><div class="head-val short">0</div><div class="head-val short">0</div><div class="head-val short">0</div><div class="head-val short">0</div><div class="head-val short">0</div><div class="head-val short">0</div><div class="head-val short">0</div>
	<div class="head-val short">0</div><div class="head-val short">0</div><div class="head-val short">0</div><div class="head-val short">0</div><div class="head-val short">0</div><div class="head-val short">0</div><div class="head-val short">0</div><div class="head-val short">0</div><div class="head-val short">0</div>
</div>
<div id="grid_array"></div>

<c:url var="mainURL" value="/js/main.js" /><script src="${ mainURL }"></script>
