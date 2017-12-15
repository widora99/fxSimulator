$(function () {

	$("#main_link").remove();
	
	// 条件名の変更を反映する
	$("#rule1").change(function() {
		$("#div-rule1").text($(this).val());
		$("#grid_array table tr.pq-grid-title-row > td:nth-child(7) > div").text($(this).val());
	});
	
	$("#rule2").change(function() {
		$("#div-rule2").text($(this).val());
		$("#grid_array table tr.pq-grid-title-row > td:nth-child(8) > div").text($(this).val());
	});
	
	$("#rule3").change(function() {
		$("#div-rule3").text($(this).val());
		$("#grid_array table tr.pq-grid-title-row > td:nth-child(9) > div").text($(this).val());
	});

	// 表部分の値を集計してヘッダ部に反映する
	function aggregate() {
		var $pqtable = $pqgrid.find(".pq-grid-table:eq(1)");
		var $pqrow = $pqtable.find(".pq-grid-row");
		
		var win = [0, 0, 0];
		var loose = [0, 0, 0];
		var total = [0, 0, 0];
		var totalwin = [0, 0, 0];
		var old = ["", "", ""];
		var rowmax = $pqrow.length;
		
		var daymax_count = {};
		
		// 連勝数・連敗数の初期化
		for(var k = 1; k <= 3; k++) {
			var $win = $("#div-rule" + k).parent().children(".head-val").text("0");
		}
		
		for(var row = 0; row < rowmax; row++) {
			var $row = $($pqrow[row]);
			// 日付ごとの集計配列を作成
			var key = $row.children("td:eq(1)").text();
			if(key !== undefined && key !== "" && key !== null) {
				daymax_count[key] = (daymax_count[key])? daymax_count[key] + 1 : 1 ;
			}
							
			// 条件ごとの連勝を集計
			for(var j = 0; j < 3; j++) {
				var rl = $row.children("td:eq("+(j+6)+")").text();
				function writeResult() {
					// １つ上の行までの連勝／連敗を出力する
					for(var i = 0; i < 9; i++) {
						// 連勝数
						var $win = $("#div-rule" + (j+1)).parent().children(".head-val:eq(" + i + ")");
						if(old[j] != rl && win[j] == i + 2) {
							$win.text(Number($win.text()) + 1);
						}
						// 連敗数
						var $loose = $("#div-rule" + (j+1)).parent().children(".head-val:eq(" + (i + 9) + ")");
						if(old[j] != rl && loose[j] == i + 2) {
							$loose.text(Number($loose.text()) + 1);
						}
					}
					// 10連勝以上は10連勝にカウント
					if(old[j] != rl && win[j] > 10) {
						var $win10 = $("#div-rule" + (j+1)).parent().children(".head-val:eq(8)");
						$win10.text(Number($win10.text()) + 1);
					}
					if(old[j] != rl && loose[j] > 10) {
						var $loose10 = $("#div-rule" + (j+1)).parent().children(".head-val:eq(17)");
						$loose10.text(Number($loose10.text()) + 1);
					}
				}
				
				// 今の行の勝ち負けを記録
				if(rl === "〇") {
					writeResult();
					win[j]++;
					total[j]++;
					loose[j] = 0;
					totalwin[j]++;
					old[j] = rl;
				} else if(rl === "×"){
					writeResult();
					win[j] = 0;
					total[j]++;
					loose[j]++;
					old[j] = rl;
				}
				
				// 最終行の場合
				if(row == rowmax - 1) {
					for(var i = 0; i < 9; i++) {
						// 連勝数
						var $win = $("#div-rule" + (j+1)).parent().children(".head-val:eq(" + i + ")");
						if(win[j] == i + 2) {
							$win.text(Number($win.text()) + 1);
						}
						// 連敗数
						var $loose = $("#div-rule" + (j+1)).parent().children(".head-val:eq(" + (i + 9) + ")");
						if(loose[j] == i + 2) {
							$loose.text(Number($loose.text()) + 1);
						}
					}
				}
				
			}
		}
		
		// 条件ごとのトレード回数と勝率
		for(var k = 0; k < 3; k++) {
			$("#rulenum" + (k + 1)).text(total[k]);
			if(total[k] == 0) {
				$("#ruleper" + (k + 1)).text("-");
			} else {
				$("#ruleper" + (k + 1)).text(Math.round(totalwin[k] * 100 / total[k]) + "%");
			}
		}
		var max = 0;
		for(var key in daymax_count) {
			if(key.trim() != "" && max < daymax_count[key]) {
				max = daymax_count[key];
			}
		}
		// 最大トレード回数
		$("#max-trade").text(max);
		
	}
	
	/* 表部分の処理 */
    dateIdx = ["日", "月", "火", "水", "木", "金", "土"];
    ruleIdx = ["〇", "×"];
    sellIdx = ["売", "買"];
    marketIdx = ["アジア", "NY", "ロンドン", "その他"];
    
	$pqgrid = $("#grid_array");
	// datepickerを日本語化する
	$.datepicker.setDefaults( $.datepicker.regional[ "ja" ] );
	
	
//	function addRow(rowIndx) {
//        var rowData = {}; //empty row template
//        //var rownum = $pqgrid.find("table:eq(2)").find("tr").length;
//        $pqgrid.pqGrid("addRow", { rowIndxPage: rowIndx, rowData: rowData });
//    }
//    //called by delete button.
//    function deleteRow(rowIndx) {
//        $pqgrid.pqGrid("addClass", { rowIndx: rowIndx, cls: 'pq-row-delete' });
//        var rowData = $pqgrid.pqGrid("getRowData", { rowIndx: rowIndx });
//        $pqgrid.pqGrid("deleteRow", { rowIndx: rowIndx, effect: true });
//
//    }
	
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
                yearRange: "-5:+5", //20 years prior to present.
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
        case "day":
        	return dateIdx;
    	case "market":
        	return marketIdx;
        case "sell":
        	return sellIdx;
        case "rule1":
        case "rule2":
        case "rule3":
        case "filter1":
        case "filter2":
        case "filter3":
        case "filter4":
        case "filter5":
        case "filter6":
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
    		} else {
    			return "その他";
    		}
    	}
    	return "";
    }
    
    // gridを変更したとき
    function gridChanged(event, ui) {
    	// 変更されたすべての行に対して実行
    	for(var row of ui.rowList) {
    		if(row.newRow !== undefined) {
	    		var time = row.newRow["time"];
	    		// 時刻が変更されていれば市場を選択しなおす
	    		if(time !== undefined) {
	    			var cell = $pqgrid.pqGrid( "getCell", { rowIndx: row.rowIndx, dataIndx: "market" } );
	    			if(cell !== null && cell !== undefined) {
	    				cell.text(marketSelector(time));
	    			}
	    		}
    		}
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
                $pqgrid.pqGrid( "getCell", { rowIndx: rowidx, dataIndx: "day" } ).text(daystr);
            }
        });
    }


    var obj = { 
    	width: 1050,
    	height: 600,
    	showTop: false,
    	showBottom: false,
    	stripeRows: true,
    	scrollModel: { autoFit: true },
    	selectionModel: { type: 'cell' },
        filterModel: { on: true, mode: "AND", header: true },
        change: gridChanged
    };
    obj.colModel = [
    	{ title: "日付", width: 200, dataType: "date", dataIndx: "date", align: 'center',
    		editor: { type: 'textbox', init: dateEditor },
//    		validations: [
//                { type: 'regexp', value: '^[0-9]{0,4}/{0,1}[0-9]{0,2}/{0,1}[0-9]{0,2}$', msg: 'yyyy/MM/dd形式で入力してください' }
//            ],
    		filter: { type: 'textbox', condition: "between", init: pqDatePicker, listeners: ['change'] }
    	},
	    { title: "曜日", width: 50, dataType: "stirng", dataIndx: "day", align: 'center', editable: false,
	    	filter: { 
	    		type: 'select',
                condition: 'equal',
                options: dateIdx,
                prepend: { '': '' },
                listeners: ['change']
            }
    	},
	    { title: "時間", width: 100, dataType: "string", dataIndx: "time", align: 'center', render: formatTime,
//    		validations: [
//                { type: 'regexp', value: '^[0-9]{0,2}:{0,1}[0-9]{0,2}$', msg: 'HH:mm形式で入力してください' }
//            ],
	    	filter: { type: 'textbox', condition: 'begin', listeners: ['keyup'] }
    	},
	    { title: "市場", width: 120, dataType: "string", dataIndx: "market", align: 'center', editable: false,
	    	filter: { 
	    		type: 'select',
                condition: 'equal',
                options: marketIdx,
                prepend: { '': '' },
                listeners: ['change']
            }
    	},
	    { title: "売買", width: 50, dataType: "string", dataIndx: "sell", align: 'center',
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
	    { title: "条件①", width: 50, dataType: "string", dataIndx: "rule1", align: 'center',
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
	    { title: "条件②", width: 50, dataType: "string", dataIndx: "rule2", align: 'center',
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
	    { title: "条件③", width: 50, dataType: "string", dataIndx: "rule3", align: 'center',
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
    	{ title: "ﾌｨﾙﾀ1", width: 50, dataType: "string", dataIndx: "filter1", align: 'center',
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
    	{ title: "ﾌｨﾙﾀ2", width: 50, dataType: "string", dataIndx: "filter2", align: 'center',
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
    	{ title: "ﾌｨﾙﾀ3", width: 50, dataType: "string", dataIndx: "filter3", align: 'center',
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
    	{ title: "ﾌｨﾙﾀ4", width: 50, dataType: "string", dataIndx: "filter4", align: 'center',
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
    	{ title: "ﾌｨﾙﾀ5", width: 50, dataType: "string", dataIndx: "filter5", align: 'center',
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
    	{ title: "ﾌｨﾙﾀ6", width: 50, dataType: "string", dataIndx: "filter6", align: 'center',
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
	    { title: "備考", width: 200, dataType: "string", dataIndx: "memo",
	    	filter: { type: 'textbox', condition: 'begin', listeners: ['keyup'] }
    	}
	];
    
    // userテーブルのデータを取得してから表示
    ajaxCall("/main/all", "GET", null, function(res) {

    	// データがないときは空行を作成
    	if(res == undefined || res.length == 0) {
    		res = [{}];
    	}
    	
    	// 取得したデータを反映
    	obj.dataModel = {
        	data: res
        };
        $pqgrid.pqGrid(obj);
        
        // 初回集計
        aggregate();
        
    });

    //オブザーバーの作成
    const observer = new MutationObserver(records => {
        // 集計処理を実行
        aggregate();
    });

    //監視オプションの作成
    const options = {
    	childList: true,
    	attributes: true
    };

    //監視の開始
    observer.observe($pqgrid[0], options);
    


    // 保存ボタン
    $("#save_btn").click(function() {
    	var data = [];
    	var $pqrow = $pqgrid.find(".pq-grid-table:eq(1)").find(".pq-grid-row");
    	for(var row of $pqrow) {
    		var main = {};
    		main["date"] = $(row).children("td:eq(1)").text();
    		main["day"] = $(row).children("td:eq(2)").text();
    		main["time"] = $(row).children("td:eq(3)").text();
    		main["market"] = $(row).children("td:eq(4)").text();
    		main["sell"] = $(row).children("td:eq(5)").text();
    		main["rule1"] = $(row).children("td:eq(6)").text();
    		main["rule2"] = $(row).children("td:eq(7)").text();
    		main["rule3"] = $(row).children("td:eq(8)").text();
    		main["filter1"] = $(row).children("td:eq(9)").text();
    		main["filter2"] = $(row).children("td:eq(10)").text();
    		main["filter3"] = $(row).children("td:eq(11)").text();
    		main["filter4"] = $(row).children("td:eq(12)").text();
    		main["filter5"] = $(row).children("td:eq(13)").text();
    		main["filter6"] = $(row).children("td:eq(13)").text();
    		main["memo"] = $(row).children("td:eq(13)").text();
    		if(main["memo"].length > 100) {
    			alert("備考が長すぎます");
    			$(row).children("td:eq(13)").addClass("error");
    			return false;
    		}
    		data.push(main);
    	}
    	ajaxCall("/main/save", "POST", {"data": JSON.stringify(data)}, function(res) {
    		alert("保存しました");
    		// 画面を更新
    		location.reload();
    	})
    });
    
});
    