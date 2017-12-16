package com.sample.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.sample.entity.Result2Entity;
import com.sample.entity.repository.Result2RepositoryManager;

@Controller
public class Result2Controller {

	@Autowired
	private Result2RepositoryManager result2manager ; 
	
	/**
	 * result2テーブルのデータを返す
	 * 
	 * @return
	 *
	 */
	@RequestMapping(path = "/result2/all", method = RequestMethod.GET, produces = "application/json; charset=UTF-8")
	@ResponseBody
	public String getResult2(HttpServletRequest request, HttpServletResponse response) throws Exception {

		// ログイン情報からユーザIDを取得
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		String username = "";
		if (principal instanceof UserDetails) {
		  username = ((UserDetails)principal).getUsername();
		} else {
		  username = principal.toString();
		}
		
		List<Result2Entity> se = result2manager.getAllResult2(username);
		Gson gson = new Gson();
		
		return gson.toJson(se);
	}
	
	/**
	 * result2テーブルのデータを保存する
	 * 
	 * @return
	 *
	 */
	@RequestMapping(path = "/result2/save", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	@ResponseBody
	public String saveUser(
			@RequestParam(name = "data", required = true) String json,
			HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		// ログイン情報からユーザIDを取得
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		String username = "";
		if (principal instanceof UserDetails) {
		  username = ((UserDetails)principal).getUsername();
		} else {
		  username = principal.toString();
		}
		
		// いったん全削除
		result2manager.deleteResult2(username);
		
		Gson gson = new Gson();
		Result2List list = gson.fromJson("{ \"result2s\":" + json + "}", Result2List.class);
		
		// 全件
		for(Result2Entity result2 : list.getResult2s()) {
			result2.setUsername(username);
			result2manager.insertResult2(result2);
		}
		
		return "{ \"result\": \"ok\"}";
		
	}
	
	/**
	 * json変換用インナークラス
	 *
	 */
	public class Result2List {
		private List<Result2Entity> result2s;

		public List<Result2Entity> getResult2s() {
			return result2s;
		}

		public void setResult2s(List<Result2Entity> result2s) {
			this.result2s = result2s;
		}
				
	}
	
}
