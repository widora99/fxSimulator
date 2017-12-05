$(function () {
	
    dateIdx = ["日", "月", "火", "水", "木", "金", "土"];
    ruleIdx = ["〇", "×"];
    sellIdx = ["売", "買"];
    marketIdx = ["アジア", "NY", "ロンドン"];
    
	$pqgrid = $("#grid_array");
	// datepickerを日本語化する
	$.datepicker.setDefaults( $.datepicker.regional[ "ja" ] );
	
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
    	['2017/1/6', '金', '15:14', 'NY', '買', '〇', '×', '×', ''],
    	['2017/1/6', '金', '15:15', 'NY', '売', '×', '〇', '×', ''],
    	['2017/1/6', '金', '15:16', 'NY', '買', '〇', '×', '×', ''],
    	['2017/1/6', '金', '15:17', 'NY', '買', '×', '×', '〇', '形汚い'],
    	['2017/1/6', '金', '15:20', 'NY', '売', '〇', '×', '×', ''],
    	['2017/1/6', '金', '15:21', 'NY', '売', '〇', '〇', '〇', ''],
    	['2017/1/9', '月', '21:20', 'ロンドン', '買', '×', '×', '×', ''],
    	['2017/1/9', '月', '21:25', 'ロンドン', '買', '〇', '×', '×', ''],
    	['2017/1/9', '月', '21:30', 'ロンドン', '売', '〇', '〇', '×', ''],
    	['2017/1/9', '月', '21:35', 'ロンドン', '買', '〇', '×', '×', ''],
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
    	width: 900,
    	height: 700,
    	showBottom: false,
    	scrollModel: { autoFit: true },
    	selectionModel: { type: 'cell' },
        filterModel: { on: true, mode: "AND", header: true },
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
    	}
	];
    obj.dataModel = {
    	data: data
    };
    $pqgrid.pqGrid(obj);

});
    