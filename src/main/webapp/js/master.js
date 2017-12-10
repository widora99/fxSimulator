$(function () {

	$("#button_area").hide();
	
	
	/* 表部分の処理 */
    $pqgrid = $("#grid_array");
    
    $pqgrid.on("change", "input[type=radio]", function() {
    	var td = $(this).closest("tr").children("td");
    	$("#u-id").val($(td[1]).text());
    	$("#pass").val($(td[2]).text());
    	$("#name").val($(td[3]).text());
    });
	
    var data = [
    	['admin', 'admin', '管理者', '管理者'],
    	['user1', 'user1Pass', 'ユーザ１', '学生'],
    	['user2', 'user2Pass', 'ユーザ２', '学生'],
    	['user3', 'user3Pass', 'ユーザ', '学生'],
    ];

    var obj = { 
    	width: 700,
    	height: 600,
    	showTop: false,
    	showBottom: false,
    	stripeRows: true,
    	scrollModel: { autoFit: true },
    	selectionModel: { type: 'cell' },
        filterModel: { on: true, mode: "AND", header: true }
    };
    obj.colModel = [
	    { title: "ユーザＩＤ", width: 200, dataType: "stirng", align: 'center', editable: false,
    		filter: { type: 'textbox', condition: 'begin', listeners: ['keyup'] }
    	},
	    { title: "パスワード", width: 200, dataType: "string", align: 'center', editable: false,
	    	filter: { type: 'textbox', condition: 'begin', listeners: ['keyup'] }
    	},
	    { title: "氏名", width: 250, dataType: "string", align: 'center', editable: false,
    		filter: { type: 'textbox', condition: 'begin', listeners: ['keyup'] }
    	},
    	{ title: "選択", width: 30, dataType: "string", align: 'center', editable: false, render:
    		function (ui) {
            	return "<input type='radio' name='user_choice'></input>";
            }
    	}
	];
    obj.dataModel = {
        	data: data
        };
    $pqgrid.pqGrid(obj);

});
    