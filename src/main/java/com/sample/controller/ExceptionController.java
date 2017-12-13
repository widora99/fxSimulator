package com.sample.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.http.client.HttpResponseException;
import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.ModelAndView;

public class ExceptionController {

	@ExceptionHandler(Exception.class)
	public ModelAndView responseException(HttpServletRequest request, HttpServletResponse response,
			HttpResponseException ex) {
		// log出力
		Logger log = Logger.getLogger("FxAppender");
		log.error("！！エラー！！", ex);
		
		ModelAndView mav = null;
		if(isAjax(request)) {
			// Ajaxリクエストには何も返さない
			mav = new ModelAndView("empty");
			response.setStatus(ex.getStatusCode(), ex.getMessage());
		} else {
			// 通常のリクエストにはシステムエラー画面を返す
			mav = new ModelAndView("systemError");
		}
		return mav;
	}
	
	public static boolean isAjax(HttpServletRequest request) {
		if(request.getHeader("X-Requested-With") != null &&
				"xmlhttprequest".equals(request.getHeader("X-Requested-With").toLowerCase())) {
			return true;
		}
		return false;
	}
	
}
