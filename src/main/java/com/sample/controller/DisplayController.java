package com.sample.controller;

import java.io.IOException;
import java.nio.charset.Charset;
import java.util.stream.Collectors;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class DisplayController {
	
	/**
	 * ログイン画面
	 * 
	 * @return
	 */
	@RequestMapping(path = "/login", method = RequestMethod.GET)
	public ModelAndView login(
			@RequestParam(name = "error", required = false) String error,
			HttpServletRequest request, 
			HttpServletResponse response) throws Exception {
		
		ModelAndView mav = null;
		try {
			 mav = new ModelAndView("login");
			if (error != null) {
				mav.addObject("msg", "IDかパスワードが間違っています");
			}
		} catch(Exception e) {
			Logger log = Logger.getLogger("FxAppender");
			log.error("エラー", e);
		}

		return mav;
	}
	
	/**
	 * ログイン認証
	 * 
	 * @return
	 */
	@RequestMapping(path = "/login", method = RequestMethod.POST)
	public String loginAuth(
			HttpServletRequest request, 
			HttpServletResponse response) throws Exception {

		return "redirect:/main";
	}
	
	/**
	 * エラー画面
	 * 
	 * @return
	 */
	@RequestMapping(path = "/error", method = RequestMethod.GET)
	public ModelAndView error(HttpServletRequest request, HttpServletResponse response) throws Exception {

		ModelAndView mav = new ModelAndView("error");

		return mav;
	}
	
	/**
	 * 管理画面
	 * 
	 * @return
	 */
	@RequestMapping(path = "/master", method = RequestMethod.GET)
	public ModelAndView maintenance(HttpServletRequest request, HttpServletResponse response) throws Exception {

		ModelAndView mav = new ModelAndView("master");

		return mav;
	}
	
	/**
	 * メインシミュレーション画面
	 * 
	 * @return
	 */
	@RequestMapping(path = "/main", method = RequestMethod.GET)
	public ModelAndView mainSimulate(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String role = auth.getAuthorities().stream()
	        .map(GrantedAuthority::getAuthority)
	        .collect(Collectors.joining("\n  "));
		
		ModelAndView mav = new ModelAndView("main");
		mav.addObject("auth", role);

		return mav;
	}
	
	/**
	 * 検証結果記録画面
	 * 
	 * @return
	 */
	@RequestMapping(path = "/result1", method = RequestMethod.GET)
	public ModelAndView result1(HttpServletRequest request, HttpServletResponse response) throws Exception {

		ModelAndView mav = new ModelAndView("result1");

		return mav;
	}
	
	/**
	 * 検証結果記録画面
	 * 
	 * @return
	 */
	@RequestMapping(path = "/result2", method = RequestMethod.GET)
	public ModelAndView result2(HttpServletRequest request, HttpServletResponse response) throws Exception {

		ModelAndView mav = new ModelAndView("result2");

		return mav;
	}
	
    @RequestMapping(value = "/excel", method = RequestMethod.POST)
    public @ResponseBody
    String excel(String excel, String extension, HttpServletRequest request) throws IOException {
        String filename="";
        if (extension.equals("csv") || extension.equals("xml")) {
            filename = "result." + extension;
            HttpSession ses = request.getSession(true);
            ses.setAttribute("excel", excel);
        } 
        return filename;
    }

    /**
     * PQGridをExcel/CSV出力する
     * @param filename
     * @param request
     * @param response
     * @throws IOException
     */
    @RequestMapping(value = "/excel", method = RequestMethod.GET)
    public void excel(String filename, HttpServletRequest request, HttpServletResponse response) throws IOException {
        if (filename.equals("result.csv") || filename.equals("result.xml")) {
            HttpSession ses = request.getSession(true);
            String excel = (String) ses.getAttribute("excel");
                        
            // 空セルが化けてはてなになるので置換
            byte[] bytemp = excel.getBytes(Charset.forName("MS932"));
            String temp = new String(bytemp);
            byte[] bytes = temp.replaceAll("\\?", "").getBytes();
            
            response.setContentType("text/plain");
            
            response.setHeader("Content-Disposition",
                    "attachment;filename=" + filename);
            response.setContentLength(bytes.length);
            ServletOutputStream out = response.getOutputStream();
            out.write(bytes);
            
            out.flush();
            out.close();
        }
    }
	
}
