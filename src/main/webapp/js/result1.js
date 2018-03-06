var defaultData = function() {
	return 	[
		{"currency" : "USDJPY"},
		{"currency" : "EURJPY"},
		{"currency" : "GBPJPY"},
		{"currency" : "AUDJPY"},
		{"currency" : "NZDJPY"},
		{"currency" : "CADJPY"},
		{"currency" : "CHFJPY"},
		{"currency" : "EURUSD"},
		{"currency" : "GBPUSD"},
		{"currency" : "AUDUSD"},
		{"currency" : "NZDUSD"},
		{"currency" : "USDCAD"},
		{"currency" : "USDCHF"},
		{"currency" : "EURAUD"},
		{"currency" : "EURNZD"},
		{"currency" : "EURCAD"},
		{"currency" : "EURCHF"},
		{"currency" : "EURGBP"},
		{"currency" : "GBPAUD"},
		{"currency" : "GBPNZD"},
		{"currency" : "GBPCAD"},
		{"currency" : "GBPCHF"},
		{"currency" : "AUDNZD"},
		{"currency" : "AUDCAD"},
		{"currency" : "NZDCAD"},
		{"currency" : "AUDCHF"},
		{"currency" : "NZDCHF"},
		{"currency" : "CADCHF"}
	];
}

$(function () {
	
	$("#result1_link").remove();
	$("#del_btn").remove();
	$("#add_btn").remove();
	
	/* 表部分の処理 */
    currencyIdx = ["USDJPY", "EURJPY", "GBPJPY", "AUDJPY", "NZDJPY", "CADJPY", "CHFJPY", "EURUSD", "GBPUSD", "AUDUSD", "NZDUSD", "USDCAD", "USDCHF", "EURAUD", "EURNZD", "EURCAD", "EURCHF", "EURGBP", "GBPAUD", "GBPNZD", "GBPCAD", "GBPCHF", "AUDNZD", "AUDCAD", "NZDCAD", "AUDCHF", "NZDCHF", "CADCHF"];
        
	$pqgrid = $("#grid_array");
	// datepickerを日本語化する
	$.datepicker.setDefaults( $.datepicker.regional[ "ja" ] );
	
    
    // 列と配列の紐づけを指定
    function idxSelector(idx) {
    	switch(idx) {
    	case "currency":
    		return currencyIdx;
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
    
  
    var obj = { 
    	width: 1050,
    	height: 700,
    	showTop: false,
    	showBottom: false,
    	stripeRows: true,
    	scrollModel: { autoFit: true },
    	flexHeight: true,
    	selectionModel: { type: 'cell' },
        filterModel: { on: true, mode: "AND", header: true },
    };
    obj.colModel = [
    	{ title: "通貨ペア", width: 80, dataType: "stirng", dataIndx: "currency", align: 'center',
            editor: {
                type: "textbox",
                align: "center",
                init: autoCompleteEditor
            },
	    	filter: { 
	    		type: 'select',
                condition: 'equal',
                options: currencyIdx,
                prepend: { '': '' },
                listeners: ['change']
            }
    	},
	    { title: "検証期間", width: 150, dataType: "stirng", dataIndx: "ranges", align: 'center',
    		filter: { type: 'textbox', condition: 'begin', listeners: ['keyup'] }
    	},
	    { title: "トータル回数", width: 80, dataType: "time", dataIndx: "total", align: 'center',
    		validations: [
                { type: 'regexp', value: '^[0-9]{1,}$', msg: '半角数字で入力してください' }
            ],
	    	filter: { type: 'textbox', condition: 'begin', listeners: ['keyup'] }
    	},
	    { title: "連勝数（回）", width: 80, dataType: "string", dataIndx: "win", align: 'center',
    		validations: [
                { type: 'regexp', value: '^[0-9]{1,}$', msg: '半角数字で入力してください' }
            ],
    		filter: { type: 'textbox', condition: 'begin', listeners: ['keyup'] }
    	},
	    { title: "連敗数（回）", width: 80, dataType: "string", dataIndx: "lose", align: 'center',
    		validations: [
                { type: 'regexp', value: '^[0-9]{1,}$', msg: '半角数字で入力してください' }
            ],
    		filter: { type: 'textbox', condition: 'begin', listeners: ['keyup'] }
    	},
	    { title: "勝率（％）", width: 80, dataType: "string", dataIndx: "per", align: 'center',
    		validations: [
                { type: 'regexp', value: '^[0-9]{1,3}$', msg: '１～３桁の半角数字で入力してください' }
            ],
	    	filter: { type: 'textbox', condition: 'begin', listeners: ['keyup'] }
    	},
    	{ title: "備考", width: 200, dataType: "string", dataIndx: "memo",
	    	filter: { type: 'textbox', condition: 'begin', listeners: ['keyup'] }
    	}
	];
    

    // userテーブルのデータを取得してから表示
    ajaxCall("/result1/all", "GET", null, function(res) {

    	// データがないときは空行を作成
    	if(res == undefined || res.length == 0) {
    		res = defaultData;
    	}
    	
    	// 取得したデータを反映
    	obj.dataModel = {
        	data: res
        };
        $pqgrid.pqGrid(obj);

    });
    
    // 保存ボタン
    $("#save_btn").click(function() {
    	var data = [];
    	var $pqrow = $pqgrid.find(".pq-grid-table:eq(1)").find(".pq-grid-row");
    	for(var row of $pqrow) {
    		var main = {};
    		main["currency"] = $(row).children("td:eq(1)").text();
    		main["ranges"] = $(row).children("td:eq(2)").text();
    		main["total"] = $(row).children("td:eq(3)").text();
    		main["win"] = $(row).children("td:eq(4)").text();
    		main["lose"] = $(row).children("td:eq(5)").text();
    		main["per"] = $(row).children("td:eq(6)").text();
    		main["memo"] = $(row).children("td:eq(7)").text();

    		if(main["memo"].length > 100) {
    			alert("備考が長すぎます");
    			$(row).children("td:eq(7)").addClass("error");
    			return false;
    		}
    		data.push(main);
    	}
    	ajaxCall("/result1/save", "POST", {"data": JSON.stringify(data)}, function(res) {
    		alert("保存しました");
    		// 画面を更新
    		location.reload();
    	})
    });

});
    