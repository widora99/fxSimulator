$(function() {
	if(auth != "ROLE_ADMIN") {
		$("#master_link").remove();
	}
	
	function addRow(rowIndx) {
        var rowData = {}; //empty row template
        //var rownum = $pqgrid.find("table:eq(2)").find("tr").length;
        $pqgrid.pqGrid("addRow", { rowIndxPage: rowIndx, rowData: rowData });
    }
    //called by delete button.
    function deleteRow(rowIndx) {
        $pqgrid.pqGrid("addClass", { rowIndx: rowIndx, cls: 'pq-row-delete' });
        var rowData = $pqgrid.pqGrid("getRowData", { rowIndx: rowIndx });
        $pqgrid.pqGrid("deleteRow", { rowIndx: rowIndx, effect: true });

    }
	
    $("#button_area").on("click", "#clear_btn", function() {
		$pqgrid.find(".pq-grid-cell").each(function() {
			$(this).text("");
		});
	});
    
	$("#button_area").on("click", "#add_btn", function() {
		var $tr = $pqgrid.find(".pq-cell-select").closest("tr"),
	    rowIndx = $pqgrid.pqGrid("getRowIndx", { $tr: $tr }).rowIndx;
		addRow(rowIndx + 1);
	});
	
	$("#button_area").on("click", "#del_btn", function() {
		var $tr = $pqgrid.find(".pq-cell-select").closest("tr"),
	    rowIndx = $pqgrid.pqGrid("getRowIndx", { $tr: $tr }).rowIndx;
		deleteRow(rowIndx);
	});
	
	$("#button_area").on("click", "#exp_btn", function() {
		$pqgrid.pqGrid("exportCsv", { url: "/fxSimulator/excel" });
	});
	
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