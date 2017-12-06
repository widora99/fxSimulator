$(function () {

	// 条件名の変更を反映する
	$("#rule1").change(function() {
		$("#div-rule1").text($(this).val());
	});
	
	$("#rule2").change(function() {
		$("#div-rule2").text($(this).val());
	});
	
	$("#rule3").change(function() {
		$("#div-rule3").text($(this).val());
	});

	// 表部分の値を集計してヘッダ部に反映する
	function aggregate() {
		var $pqtable = $pqgrid.find(".pq-grid-table:eq(1)");
		var $pqrow = $pqtable.find(".pq-grid-row");
		var max_trade = $pqrow.length;
		$("#max-trade").text(max_trade);
		var win1 = 0;
		var win2 = 0;
		var win3 = 0;
		var loose1 = 0;
		var loose2 = 0;
		var loose3 = 0;
		var totalwin1 = 0;
		var totalwin2 = 0;
		var totalwin3 = 0;
		
		$pqrow.each(function() {
			if($(this).children("td:eq(6)").text() === "〇") {
				win1++;
				totalwin1++;
				loose1 = 0;
			} else {
				win1 = 0;
				loose1++;
			}
			if($(this).children("td:eq(7)").text() === "〇") {
				win2++;
				totalwin2++;
				loose = 0;
			} else {
				win2 = 0;
				loose2++;
			}
			if($(this).children("td:eq(8)").text() === "〇") {
				win3++;
				totalwin3++;
				loose3 = 0;
			} else {
				win3 = 0;
				loose3++;
			}
			
			for(var i = 0; i < 9; i++) {
				var $cell1 = $("#div-rule1").parent().children(".head-val:eq(" + i + ")");
				if(win1 == i + 2) {
					$cell1.text(Number($cell1.text()) + 1);
				}
				var $cell2 = $("#div-rule2").parent().children(".head-val:eq(" + i + ")");
				if(win2 == i + 2) {
					$cell2.text(Number($cell2.text()) + 1);
				}
				var $cell3 = $("#div-rule3").parent().children(".head-val:eq(" + i + ")");
				if(win3 == i + 2) {
					$cell3.text(Number($cell3.text()) + 1);
				}
			}
			
			for(var i = 9; i < 18; i++) {
				var $cell1 = $("#div-rule1").parent().children(".head-val:eq(" + i + ")");
				if(loose1 == i - 7) {
					$cell1.text(Number($cell1.text()) + 1);
				}
				var $cell2 = $("#div-rule2").parent().children(".head-val:eq(" + i + ")");
				if(loose2 == i - 7) {
					$cell2.text(Number($cell2.text()) + 1);
				}
				var $cell3 = $("#div-rule3").parent().children(".head-val:eq(" + i + ")");
				if(loose3 == i - 7) {
					$cell3.text(Number($cell3.text()) + 1);
				}
			}
			
		});
		
		
	}
	
	/* 表部分の処理 */
    dateIdx = ["日", "月", "火", "水", "木", "金", "土"];
    ruleIdx = ["〇", "×"];
    sellIdx = ["売", "買"];
    marketIdx = ["アジア", "NY", "ロンドン"];
    
	$pqgrid = $("#grid_array");
	// datepickerを日本語化する
	$.datepicker.setDefaults( $.datepicker.regional[ "ja" ] );
	
	
	function addRow(rowIndx) {
        var rowData = ["", "", "", "", "", "", "", "", ""]; //empty row template
        //var rownum = $pqgrid.find("table:eq(2)").find("tr").length;
        $pqgrid.pqGrid("addRow", { rowIndxPage: rowIndx, rowData: rowData });
    }
    //called by delete button.
    function deleteRow(rowIndx) {
        $pqgrid.pqGrid("addClass", { rowIndx: rowIndx, cls: 'pq-row-delete' });
        var rowData = $pqgrid.pqGrid("getRowData", { rowIndx: rowIndx });
        $pqgrid.pqGrid("deleteRow", { rowIndx: rowIndx, effect: true });

    }
	
	// 時刻を[:]つきにする
    function formatTime(ui) {
        var cellData = ui.cellData;
        if (cellData == null) {
            return "";
        } else {
        	switch(cellData.length) {
        	case 4:
        		if(cellData.indexOf(":") === 1) {
        			// ex. "1:23"→"01:23"
        			return "0" + cellData.slice(0, 1) + ":" + cellData.slice(-2);
        		} else if(cellData.indexOf(":") === 2) {
        			// ex. "11:2"→"11:02"
        			return cellData.slice(0, 2) + ":0" + cellData.slice(-1);	
        		} else {
        			// ex. "1120"→"11:20"
        			return cellData.slice(0, 2) + ":" + cellData.slice(-2);
        		}
        	case 3:
        		if(cellData.indexOf(":") === 1) {
        			// ex. "1:2"→"01:02"
        			return "0" + cellData.slice(0, 1) + ":0" + cellData.slice(-1);
        		}        		
        		// elseは時：分の割合が不明なのでそのまま返す
        	default:
        		return cellData;
        	}
        }
    }
	
	// 日付フィルタ
    function pqDatePicker(ui) {
        var $this = $(this);
        $this
            .css({ zIndex: 3, position: "relative" })
            .datepicker({
                yearRange: "-20:+0", //20 years prior to present.
                changeYear: true,
                changeMonth: true,
                //showButtonPanel: true,
                onClose: function (evt, ui) {
                    $(this).focus();
                }
            });
        //default From date
        $this.filter(".pq-from").datepicker("option", "defaultDate", new Date(Date.now()));
        //default To date
        $this.filter(".pq-to").datepicker("option", "defaultDate", new Date(Date.now()));
    }
    
    // 列と配列の紐づけを指定
    function idxSelector(idx) {
    	switch(idx) {
        case 1:
        	return dateIdx;
    	case 3:
        	return marketIdx;
        case 4:
        	return sellIdx;
        case 5:
        case 6:
        case 7:
        	return ruleIdx;
        default:
        	return [];
        }
    }
    
    // 時間から市場を選択する
    function marketSelector(time) {
    	if(time.length >= 2) {
    		if(time[1] === ":") {
    			var num = Number(time.slice(0, 1)); 
    		} else {
    			var num = Number(time.slice(0, 2));
    		}
    		if(num >= 2 && num < 9) {
    			return "アジア";
    		} else if(num >= 9 && num < 14) {
    			return "ロンドン";
    		} else if(num >= 14 && num < 21) {
    			return "NY";
    		}
    	}
    	return "";
    }
    
    // gridを変更したとき
    function gridChanged(event, ui) {
    	// 変更されたすべての行に対して実行
    	for(var row of ui.rowList) {
    		if(row.newRow !== undefined) {
	    		var time = row.newRow[2];
	    		// 時刻が変更されていれば市場を選択しなおす
	    		if(time !== undefined) {
	    			var cell = $pqgrid.pqGrid( "getCell", { rowIndx: row.rowIndx, dataIndx: 3 } );
	    			if(cell !== null && cell !== undefined) {
	    				cell.text(marketSelector(time));
	    			}
	    		}
    		}
    	}
    	// 集計
    	aggregate();
    }
    
    // セレクト式エディタ
    var autoCompleteEditor = function (ui) {
        var $inp = ui.$cell.find("input");      
        
        //initialize the editor
        $inp.autocomplete({
            source: idxSelector(ui.dataIndx),
            selectItem: { on: true }, //custom option
            highlightText: { on: true }, //custom option
            minLength: 0
        }).focus(function () {
            //open the autocomplete upon focus                
            $(this).autocomplete("search", "");
        });
    }
    
    // 日付エディタ
    var dateEditor = function (ui) {
        var $inp = ui.$cell.find("input"),
            $grid = $(this),
            rowidx = ui.rowIndx,
            dataidx = ui.column.dataIndx,
            validate = function (that) {
                var valid = $grid.pqGrid("isValid", { dataIndx: ui.dataIndx, value: $inp.val() }).valid;
                if (!valid) {
                    that.firstOpen = false;
                }
            };

        //initialize the editor
        $inp
        .on("input", function (evt) {
            validate(this);
        })
        .datepicker({
            changeMonth: true,
            changeYear: true,
            showAnim: '',
            onSelect: function () {
                this.firstOpen = true;
                validate(this);
            },
            beforeShow: function (input, inst) {
                return !this.firstOpen;
            },
            onClose: function (evt, ui) {
                this.focus();
                var daystr = dateIdx[new Date(this.value).getDay()];
                $pqgrid.pqGrid( "getCell", { rowIndx: rowidx, dataIndx: dataidx + 1 } ).text(daystr);
            }
        });
    }
	
    var data = [
    	['2017/1/6', '金', '15:11', 'NY', '買', '〇', '×', '×', ''],
    	['2017/1/6', '金', '15:12', 'NY', '売', '〇', '×', '×', ''],
    	['2017/1/6', '金', '15:13', 'NY', '買', '×', '×', '×', ''],
    	['2017/1/6', '金', '15:14', 'NY', '買', '〇', '×', '〇', ''],
    	['2017/1/6', '金', '15:15', 'NY', '売', '×', '〇', '〇', ''],
    	['2017/1/6', '金', '15:16', 'NY', '買', '〇', '〇', '〇', ''],
    	['2017/1/6', '金', '15:17', 'NY', '買', '×', '×', '〇', '形汚い'],
    	['2017/1/6', '金', '15:20', 'NY', '売', '〇', '×', '×', ''],
    	['2017/1/6', '金', '15:21', 'NY', '売', '〇', '〇', '〇', ''],
    	['2017/1/9', '月', '21:20', 'ロンドン', '買', '×', '×', '〇', ''],
    	['2017/1/9', '月', '21:25', 'ロンドン', '買', '〇', '〇', '×', ''],
    	['2017/1/9', '月', '21:30', 'ロンドン', '売', '〇', '〇', '×', ''],
    	['2017/1/9', '月', '21:35', 'ロンドン', '買', '〇', '〇', '〇', ''],
    	['2017/1/9', '月', '21:40', 'ロンドン', '売', '×', '×', '〇', ''],
    	['2017/1/9', '月', '21:45', 'ロンドン', '買', '×', '×', '×', ''],
    	['2017/1/9', '月', '21:50', 'ロンドン', '買', '〇', '×', '×', ''],
    	['2017/1/9', '月', '21:55', 'ロンドン', '買', '〇', '×', '×', ''],
    	['2017/1/9', '月', '22:00', 'ロンドン', '買', '〇', '×', '×', ''],
    	['2017/1/9', '月', '22:05', 'ロンドン', '買', '〇', '×', '×', ''],
    	['2017/1/9', '月', '22:10', 'ロンドン', '買', '〇', '×', '×', ''],
    	['2017/1/9', '月', '22:15', 'ロンドン', '買', '〇', '×', '×', ''],
    	['2017/1/9', '月', '22:20', 'ロンドン', '買', '〇', '×', '×', ''],
    	['2017/1/9', '月', '22:25', 'ロンドン', '買', '〇', '×', '×', ''],
    	['2017/1/9', '月', '22:30', 'ロンドン', '買', '〇', '×', '×', '']
    ];



    var obj = { 
    	width: 980,
    	height: 700,
    	showTop: false,
    	showBottom: false,
    	stripeRows: true,
    	scrollModel: { autoFit: true },
    	selectionModel: { type: 'cell' },
        filterModel: { on: true, mode: "AND", header: true },
        change: gridChanged,
        create: aggregate
    };
    obj.colModel = [
    	{ title: "日付", width: 200, dataType: "date", align: 'center',
    		editor: { type: 'textbox', init: dateEditor },
    		filter: { type: 'textbox', condition: "between", init: pqDatePicker, listeners: ['change'] }
    	},
	    { title: "曜日", width: 50, dataType: "stirng", align: 'center', editable: false,
	    	filter: { 
	    		type: 'select',
                condition: 'equal',
                options: dateIdx,
                prepend: { '': '' },
                listeners: ['change']
            }
    	},
	    { title: "時間", width: 100, dataType: "time", align: 'center', render: formatTime,
	    	filter: { type: 'textbox', condition: 'begin', listeners: ['keyup'] }
    	},
	    { title: "市場", width: 120, dataType: "string", align: 'center', editable: false,
	    	filter: { 
	    		type: 'select',
                condition: 'equal',
                options: marketIdx,
                prepend: { '': '' },
                listeners: ['change']
            }
    	},
	    { title: "売買", width: 50, dataType: "string", align: 'center',
            editor: {
                type: "textbox",
                align: "center",
                init: autoCompleteEditor
            },
	    	filter: { 
	    		type: 'select',
                condition: 'equal',
                options: sellIdx,
                prepend: { '': '' },
                listeners: ['change']
            }
    	},
	    { title: "5pip", width: 50, dataType: "string", align: 'center',
            editor: {
                type: "textbox",
                init: autoCompleteEditor
            },
	    	filter: { 
	    		type: 'select',
                condition: 'equal',
                options: ruleIdx,
                prepend: { '': '' },
                listeners: ['change']
            }
    	},
	    { title: "8pip", width: 50, dataType: "string", align: 'center',
            editor: {
                type: "textbox",
                init: autoCompleteEditor
            },
	    	filter: { 
	    		type: 'select',
                condition: 'equal',
                options: ruleIdx,
                prepend: { '': '' },
                listeners: ['change']
            }
    	},
	    { title: "10pip", width: 50, dataType: "string", align: 'center',
            editor: {
                type: "textbox",
                init: autoCompleteEditor
            },
	    	filter: { 
	    		type: 'select',
                condition: 'equal',
                options: ruleIdx,
                prepend: { '': '' },
                listeners: ['change']
            }
    	},
	    { title: "備考", width: 200, dataType: "string",
	    	filter: { type: 'textbox', condition: 'begin', listeners: ['keyup'] }
    	},
    	{ title: "", editable: false, minWidth: 80, sortable: false, render: function (ui) {
            return "<button type='button' class='btn btn-info add_btn'>+</button><button type='button' class='btn btn-danger delete_btn'>×</button>";
        }}
	];
    obj.dataModel = {
    	data: data
    };
    $pqgrid.pqGrid(obj);
        
    $pqgrid.on("click", ".add_btn", function() {
    	var $tr = $(this).closest("tr"),
        rowIndx = $pqgrid.pqGrid("getRowIndx", { $tr: $tr }).rowIndx;
    	addRow(rowIndx + 1);
    });
    
    $pqgrid.on("click", ".delete_btn", function() {
    	var $tr = $(this).closest("tr"),
        rowIndx = $pqgrid.pqGrid("getRowIndx", { $tr: $tr }).rowIndx;
    	deleteRow(rowIndx);
    });

});
    