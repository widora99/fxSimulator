package com.sample.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.sample.entity.UserEntity;
import com.sample.entity.repository.UserRepositoryManager;

@Controller
public class DbController {

	@Autowired
	private UserRepositoryManager usermanager ; 
	
	/**
	 * userテーブルのデータを返す
	 * 
	 * @return
	 *
	 */
	@RequestMapping(path = "/user", method = RequestMethod.GET, produces = "application/json; charset=UTF-8")
	@ResponseBody
	public String getUser(HttpServletRequest request, HttpServletResponse response) throws Exception {

		List<UserEntity> se = usermanager.getAllUser();
		Gson gson = new Gson();
		
		return gson.toJson(se);
	}
	
	/**
	 * userテーブルのデータを返す
	 * 
	 * @return
	 *
	 */
	@RequestMapping(path = "/user/{command}", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	@ResponseBody
	public String updUser(
			@PathVariable() String command,
			@RequestParam(name = "id", required = true) String id,
			@RequestParam(name = "pass", required = true) String pass,
			@RequestParam(name = "name", required = false) String name,
			HttpServletRequest request, HttpServletResponse response) throws Exception {

		switch(command) {
		case "add":
			return usermanager.insertUser(id, pass, name);
		case "upd":
			return usermanager.updateUser(id, pass, name);
		case "del":
			return usermanager.deleteUser(id);
		default: 
			return "{\"result\": \"ng\"}";
		}
		
	}
	
	
}
