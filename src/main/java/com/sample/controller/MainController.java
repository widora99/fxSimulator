package com.sample.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.sample.entity.MainEntity;
import com.sample.entity.repository.MainRepositoryManager;

@Controller
public class MainController {

	@Autowired
	private MainRepositoryManager mainmanager ; 
	
	/**
	 * userテーブルのデータを返す
	 * 
	 * @return
	 *
	 */
	@RequestMapping(path = "/main/all", method = RequestMethod.GET, produces = "application/json; charset=UTF-8")
	@ResponseBody
	public String getMain(HttpServletRequest request, HttpServletResponse response) throws Exception {

		List<MainEntity> se = mainmanager.getAllMain();
		Gson gson = new Gson();
		
		return gson.toJson(se);
	}
	
	/**
	 * userテーブルのデータを返す
	 * 
	 * @return
	 *
	 */
	@RequestMapping(path = "/main/save", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	@ResponseBody
	public String saveUser(
			@PathVariable() String command,
			@RequestParam(name = "maindata", required = true) List<MainEntity> data,
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
		mainmanager.deleteMain(username);
		
		// 全件
		for(MainEntity main of data) {
			mainmanager.updateMain(main);
		}
		
	}
	
	
}
