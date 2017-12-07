$(function() {
	
	function addRow(rowIndx) {
        var rowData = []; //empty row template
        //var rownum = $pqgrid.find("table:eq(2)").find("tr").length;
        $pqgrid.pqGrid("addRow", { rowIndxPage: rowIndx, rowData: rowData });
    }
    //called by delete button.
    function deleteRow(rowIndx) {
        $pqgrid.pqGrid("addClass", { rowIndx: rowIndx, cls: 'pq-row-delete' });
        var rowData = $pqgrid.pqGrid("getRowData", { rowIndx: rowIndx });
        $pqgrid.pqGrid("deleteRow", { rowIndx: rowIndx, effect: true });

    }
	
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
		$pqgrid.pqGrid("exportCsv", { url: "/sample/excel" });
	});
});