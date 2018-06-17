$(function() {
	if(auth != "ROLE_ADMIN") {
		$("#master_link").remove();
	}
	
	function addRow(rowIndx) {
        var rowData = {}; //empty row template
        $pqgrid.pqGrid("addRow", { rowIndxPage: rowIndx, rowData: rowData });
    }

    function deleteRow(rowIndx) {
        $pqgrid.pqGrid("deleteRow", { rowIndx: rowIndx, effect: true });
    }
	
    $("#button_area").on("click", "#clear_btn", function() {
    	if(typeof defaultData != "function") {
    		$pqgrid.pqGrid( "option", "dataModel", { data: [{}] } );
    	} else {
    		$pqgrid.pqGrid( "option", "dataModel", { data: defaultData() } );
    	}
		$pqgrid.pqGrid( "refreshDataAndView");
	});
    
	$("#button_area").on("click", "#add_btn", function() {
		addrowbtn();
	});
	
	$("#button_area").on("click", "#del_btn", function() {
		delrowbtn();
	});
	
	$("#button_area").on("click", "#exp_btn", function() {
		$pqgrid.pqGrid("exportCsv", { url: "/fxSimulator/excel" });
	});
	
	$(window).keydown(function(e){
		if(e.keyCode == 107) {
			addrowbtn();
		}
	});
	
	$(window).keydown(function(e){
		if(e.keyCode == 109) {
			delrowbtn();
		}
	});
	function addrowbtn() {
		var $tr = $pqgrid.find(".pq-cell-select").closest("tr"),
	    rowIndx = $pqgrid.pqGrid("getRowIndx", { $tr: $tr }).rowIndx;
		addRow(rowIndx + 1);
	}
	function delrowbtn() {
		var $tr = $pqgrid.find(".pq-cell-select").closest("tr"),
	    rowIndx = $pqgrid.pqGrid("getRowIndx", { $tr: $tr }).rowIndx;
		deleteRow(rowIndx);
	}
});

function ajaxCall(uri, method, data, func, errfunc) {
	$.ajaxSetup({
    	scriptCharset: 'utf-8'
    });
    $.ajax({
    	type: method,
    	url : "/fxSimulator" + uri,
    	timeout: 10000,
    	cache: true,
    	data: data,
    	beforeSend: function(jqXHR) {
    		return true;
    	},
    }).done(function(res, status, jqXHR) {
    	func(res, status, jqXHR);
    }).fail(function(jqXHR, status, errorThrown) {
    	if(errfunc !== undefined) {
    		errfunc(jqXHR, status, errorThrown);
    	} else {
	    	if(jqXHR.responseText != undefined) {
	    		if(status == "timeout") {
	    			alert("タイムアウト");
		    	} else {
		    		alert("失敗しました");
		    		console.log(jqXHR.responseText);
		    	}
	    	} else {
	    		alert("失敗しました");
	    		console.log(errorThrown);
	    	}
    	}
    });
}