$(function () {

	
	/* 表部分の処理 */
    currencyIdx = ["USDJPY", "EURJPY", "GBPJPY", "AUDJPY", "NZDJPY", "CADJPY", "CHFJPY", "EURUSD GBPUSD", "AUDUSD", "NZDUSD", "USDCAD", "USDCHF", "EURAUD", "EURNZD", "EURCAD", "EURCHF", "EURGBP", "GBPAUD", "GBPNZD", "GBPCAD", "GBPCHF AUDNZD", "AUDCAD", "NZDCAD", "AUDCHF", "NZDCHF", "CADCHF"];
    spanIdx = ["1分足", "5分足", "15分足", "30分足", "1H足", "4H足", "日足"];
        
	$pqgrid = $("#grid_array");
	// datepickerを日本語化する
	$.datepicker.setDefaults( $.datepicker.regional[ "ja" ] );
	
    
    // 列と配列の紐づけを指定
    function idxSelector(idx) {
    	switch(idx) {
    	case 0:
    		return currencyIdx;
        case 1:
        	return spanIdx;
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
    
  
    var data = [
    	['USDJPY', '1分足', '20170201', '123', '16', '12', '56', 'メモ'],
    	['GBPJPY', '5分足', '20170201', '123', '18', '14', '52', 'メモ'],
    	['AUDJPY', '1時間足', '20170201', '123', '8', '4', '49', 'メモ'],
    	['CADCHF', '4時間足', '20170201', '123', '13', '1', '60', 'メモ'],
    	['USDJPY', '日足', '20170201', '123', '26', '11', '56', ''],
    ];



    var obj = { 
    	width: 980,
    	height: 850,
    	showTop: false,
    	showBottom: false,
    	stripeRows: true,
    	scrollModel: { autoFit: true },
    	selectionModel: { type: 'cell' },
        filterModel: { on: true, mode: "AND", header: true },
    };
    obj.colModel = [
    	{ title: "通貨ペア", width: 80, dataType: "stirng", align: 'center',
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
    	{ title: "時間足", width: 80, dataType: "stirng", align: 'center',
            editor: {
                type: "textbox",
                align: "center",
                init: autoCompleteEditor
            },
	    	filter: { 
	    		type: 'select',
                condition: 'equal',
                options: spanIdx,
                prepend: { '': '' },
                listeners: ['change']
            }
    	},
	    { title: "検証期間", width: 150, dataType: "stirng", align: 'center',
    		filter: { type: 'textbox', condition: 'begin', listeners: ['keyup'] }
    	},
	    { title: "トータル回数（回）", width: 80, dataType: "time", align: 'center',
	    	filter: { type: 'textbox', condition: 'begin', listeners: ['keyup'] }
    	},
	    { title: "連勝数（回）", width: 80, dataType: "string", align: 'center',
    		filter: { type: 'textbox', condition: 'begin', listeners: ['keyup'] }
    	},
	    { title: "連敗数（回）", width: 80, dataType: "string", align: 'center',
    		filter: { type: 'textbox', condition: 'begin', listeners: ['keyup'] }
    	},
	    { title: "勝率（％）", width: 80, dataType: "string", align: 'center',
	    	filter: { type: 'textbox', condition: 'begin', listeners: ['keyup'] }
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
    