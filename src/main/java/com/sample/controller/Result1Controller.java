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
import com.sample.entity.Result1Entity;
import com.sample.entity.repository.Result1RepositoryManager;

@Controller
public class Result1Controller {

	@Autowired
	private Result1RepositoryManager result1manager ; 
	
	/**
	 * result1テーブルのデータを返す
	 * 
	 * @return
	 *
	 */
	@RequestMapping(path = "/result1/all", method = RequestMethod.GET, produces = "application/json; charset=UTF-8")
	@ResponseBody
	public String getResult1(HttpServletRequest request, HttpServletResponse response) throws Exception {

		// ログイン情報からユーザIDを取得
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		String username = "";
		if (principal instanceof UserDetails) {
		  username = ((UserDetails)principal).getUsername();
		} else {
		  username = principal.toString();
		}
		
		List<Result1Entity> se = result1manager.getAllResult1(username);
		Gson gson = new Gson();
		
		return gson.toJson(se);
	}
	
	/**
	 * result1テーブルのデータを保存する
	 * 
	 * @return
	 *
	 */
	@RequestMapping(path = "/result1/save", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
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
		result1manager.deleteResult1(username);
		
		Gson gson = new Gson();
		Result1List list = gson.fromJson("{ \"result1s\":" + json + "}", Result1List.class);
		
		// 全件
		for(Result1Entity result1 : list.getResult1s()) {
			result1.setUsername(username);
			result1manager.insertResult1(result1);
		}
		
		return "{ \"result\": \"ok\"}";
		
	}
	
	/**
	 * json変換用インナークラス
	 *
	 */
	public class Result1List {
		private List<Result1Entity> result1s;

		public List<Result1Entity> getResult1s() {
			return result1s;
		}

		public void setResult1s(List<Result1Entity> result1s) {
			this.result1s = result1s;
		}
				
	}
	
}
