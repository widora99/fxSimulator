package com.sample.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.sample.entity.SampleEntity;
import com.sample.entity.repository.SampleRepositoryManager;

@Controller
public class SampleController {

	@Autowired
	private SampleRepositoryManager sampleRepositoryManager ; 
	
	/**
	 * 通常の画面表示のサンプル
	 * 
	 * @return
	 */
	@RequestMapping(path = "/sample", method = RequestMethod.GET)
	public ModelAndView mavSample(HttpServletRequest request, HttpServletResponse response) throws Exception {

		ModelAndView mav = new ModelAndView("sample");
		List<SampleEntity> se = sampleRepositoryManager.getSamples();
		mav.addObject("sample", se.get(0));

		return mav;
	}


	/**
	 * jsonレスポンスのサンプル
	 * 
	 * @param val
	 */
	@RequestMapping(path = "/sample/{val}/**", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	@ResponseBody
	public String jsonSample(@PathVariable() String val) throws Exception {

		String json = "{\"data\": \"hoge\"}";
		return json;
	}

	
}
