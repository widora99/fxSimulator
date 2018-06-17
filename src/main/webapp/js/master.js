$(function () {
	
	$("#master_link").remove();
	$("#button_area").remove();
	
	
	/* 表部分の処理 */
    $pqgrid = $("#grid_array");
    
    $pqgrid.on("change", "input[type=radio]", function() {
    	var td = $(this).closest("tr").children("td");
    	$("#u-id").val($(td[1]).text());
    	$("#pass").val($(td[2]).text());
    	$("#name").val($(td[3]).text());
    });
	  

    var obj = { 
    	width: 700,
    	height: 600,
    	showTop: false,
    	showBottom: false,
    	stripeRows: true,
    	scrollModel: { autoFit: true },
    	flexHeight: true,
    	selectionModel: { type: 'cell' },
        filterModel: { on: true, mode: "AND", header: true }
    };
    obj.colModel = [
	    { title: "ユーザＩＤ", width: 200, dataType: "stirng", dataIndx: "id", align: 'center', editable: false,
    		filter: { type: 'textbox', condition: 'begin', listeners: ['keyup'] }
    	},
	    { title: "パスワード", width: 200, dataType: "string", dataIndx: "password", align: 'center', editable: false,
	    	filter: { type: 'textbox', condition: 'begin', listeners: ['keyup'] }
    	},
	    { title: "氏名", width: 250, dataType: "string", dataIndx: "name", align: 'center', editable: false,
    		filter: { type: 'textbox', condition: 'begin', listeners: ['keyup'] }
    	},
    	{ title: "選択", width: 30, dataType: "string", align: 'center', editable: false, render:
    		function (ui) {
            	return "<input type='radio' name='user_choice'></input>";
            }
    	}
	];
    
    // userテーブルのデータを取得してから表示
    ajaxCall("/user", "GET", null, function(res) {
    	obj.dataModel = {
            	data: res
            };
        $pqgrid.pqGrid(obj);
    });
    
    $("#delete_btn").click(function() {
    	$selected = $("input[type=radio]:checked").closest("tr").children("td:eq(1)");
    	if($selected.text() == "admin") {
    		alert("adminは削除できません");
    		return false;
    	}
    	// 確認メッセージ
    	if(!confirm($selected.text() + "を削除します。よろしいですか？")) {
    		return false;
    	}
    	var data = {
    		id: $selected.text()
    	}
    	ajaxCall("/user/del", "POST", data, function(res) {
    		if(res.result == "ok") {
    			alert("削除しました");
    		} else {
    			alert("削除に失敗しました");
    		}
    		// 画面を更新
    		location.reload();
    	})
    });
    
    $("#repair_btn").click(function() {
    	var $selected = $("input[type=radio]:checked").closest("tr").children("td:eq(1)");
    	if($selected.text() != $("#u-id").val()) {
    		alert("ユーザIDは変更できません");
    		return false;
    	}  	
    	if($("#pass").val() === "") {
    		alert("パスワードを入力してください");
    		return;
    	}
    	// 確認メッセージ
    	if(!confirm($selected.text() + "を更新します。よろしいですか？")) {
    		return false;
    	}
    	var data = {
    		id: $("#u-id").val(),
    		pass: $("#pass").val(),
    		name: $("#name").val()
    	};
    	ajaxCall("/user/upd", "POST", data, function(res) {
    		if(res.result == "ok") {
    			alert("更新しました");
    		} else {
    			alert("更新に失敗しました");
    		}
    		// 画面を更新
    		location.reload();
    	});
    });
    
    $("#new_btn").click(function() {
    	if($("#u-id").val() === "") {
    		alert("idを入力してください");
    		return;
    	}
    	if($("#pass").val() === "") {
    		alert("パスワードを入力してください");
    		return;
    	}
    	var data = {
    		id: $("#u-id").val(),
    		pass: $("#pass").val(),
    		name: $("#name").val()
    	};
    	ajaxCall("/user/add", "POST", data, function(res) {
    		if(res.result == "ok") {
    			alert("ユーザを作成しました");
    		} else {
    			alert("ユーザの作成に失敗しました");
    		}
    		// 画面を更新
    		location.reload();
    	});
    });
});
    